package doyeon.mp.audiorecord;

import android.Manifest;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.pm.PackageManager;
import android.media.MediaPlayer;
import android.media.MediaRecorder;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.text.Html;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.webkit.MimeTypeMap;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.skyfishjy.library.RippleBackground;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.HttpUrl;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;

public class MainActivity extends AppCompatActivity {

    private Button uploadBtn;
    private TextView mRecordLabel,mEmotionLabel,mIntensityLabel;
    private MediaRecorder mRecorder;

    private String mFileName = null;
    private int nSelectItem = -1;
    private double intensity = 0;
    private static final String LOG_TAG = "Record_log";

    // 녹음 시간
    public TextView timerTextView;
    private long startHTime = 0L;
    private Handler customHandler = new Handler();
    long timeInMilliseconds = 0L;

    // 서버에 넘길 값
    public DecimalFormat form = new DecimalFormat("#.#");
    public String uuid;
    public String request_time;
    public String emotion;

    // 서버 응답
    private ResponseBody body;
    boolean file_response = false;

    final int REQUEST_PERMISSION_CODE =1000;

    private static String EXTERNAL_STORAGE_PATH = Environment.getExternalStorageDirectory().getAbsolutePath();
    MediaPlayer mp;

    RippleBackground rippleBackground;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if(!checkPermissionFromDevice()){
            requestPermission();
        }

        mRecordLabel =(TextView) findViewById(R.id.recordLbl);
        mEmotionLabel =(TextView) findViewById(R.id.emotionLbl);
        mIntensityLabel =(TextView) findViewById(R.id.intensityLbl);
        Button mRecordBtn =(Button)findViewById(R.id.recordBtn);
        Button mStopBtn = (Button)findViewById(R.id.stopBtn);
        timerTextView = (TextView)findViewById(R.id.recordTime);
        image = (ImageView)findViewById(R.id.center_image);

        rippleBackground = (RippleBackground)findViewById(R.id.content);


        mRecordBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                rippleBackground.startRippleAnimation();
                startRecording();
                mRecordLabel.setText(Html.fromHtml("종료를 눌러 녹음을 완료하세요" + "<br />" + "길이는 10초 이내를 권장해요"));
            }
        });

        mStopBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                stopRecording();
                rippleBackground.stopRippleAnimation();
                mRecordLabel.setText(Html.fromHtml("녹음이 종료되었어요" + "<br />" + "이제 감정을 선택하세요"));
            }
        });

        mFileName = Environment.getExternalStorageDirectory() + "/file.wav";

        uploadBtn =(Button)findViewById(R.id.uplaodBtn);
        uploadBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sendFile();
            }
        });
    }

    public void startRecording() {
        mRecorder = new MediaRecorder();
        mRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
        mRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
        mRecorder.setOutputFile(mFileName);
        mRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);

        uuid = UUID.randomUUID().toString();

        try {
            mRecorder.prepare();
        } catch (IOException e) {
            Log.e(LOG_TAG, "prepare() failed");
        }
        mRecorder.start();
        startHTime = System.currentTimeMillis();
        customHandler.postDelayed(updateTimerThread, 0);
    }

    public void stopRecording() {
        mRecorder.stop();
        customHandler.removeCallbacks(updateTimerThread);
        mRecorder.reset();
        mRecorder.release();
        mRecorder = null;
    }

    private Runnable updateTimerThread = new Runnable() {
        public void run() {
            timeInMilliseconds = System.currentTimeMillis() - startHTime;
            int secs = (int) (timeInMilliseconds / 1000);
            int mins = secs / 60;
            secs = secs % 60;
            if (timerTextView != null)
                timerTextView.setText("" + String.format("%02d", mins) + ":"+ String.format("%02d", secs));
            customHandler.postDelayed(this, 0);
        }
    };

    private void requestPermission(){
        ActivityCompat.requestPermissions(this,new String[]{
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.RECORD_AUDIO,
                Manifest.permission.READ_EXTERNAL_STORAGE
        },REQUEST_PERMISSION_CODE);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        switch(requestCode) {
            case REQUEST_PERMISSION_CODE: {
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED)
                    Toast.makeText(this, "Permission Granted", Toast.LENGTH_SHORT).show();
                else{
                    Toast.makeText(this, "Permission Denied", Toast.LENGTH_SHORT).show();
                }
            }
            break;
        }
    }

    private boolean checkPermissionFromDevice(){

        int write_internal_storage_result = ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE);
        int record_audio_result = ContextCompat.checkSelfPermission(this,Manifest.permission.RECORD_AUDIO);
        int read_internal_storage_result = ContextCompat.checkSelfPermission(this,Manifest.permission.READ_EXTERNAL_STORAGE);

        return  write_internal_storage_result == PackageManager.PERMISSION_GRANTED && record_audio_result == PackageManager.PERMISSION_GRANTED && read_internal_storage_result == PackageManager.PERMISSION_GRANTED;
    }

    private void sendFile() {

        mRecordLabel.setText("서버에 음성 파일을 전송했어요");
        timerTextView.setText("");

        SimpleDateFormat date_format = new SimpleDateFormat( "yyyy-MM-dd HH:mm:ss");
        Date time = new Date();
        request_time = date_format.format(time);

        OkHttpClient client = new OkHttpClient();
        File f = new File(mFileName);
        String content_type  = getMimeType(f.getPath());
        String file_path = f.getAbsolutePath();

        RequestBody file_body = RequestBody.create(MediaType.parse(content_type),f);
        RequestBody requestBody = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("uuid", uuid)
                .addFormDataPart("request_time", request_time)
                .addFormDataPart("speech",file_path.substring(file_path.lastIndexOf("/")+1), file_body)
                .addFormDataPart("emotion", emotion)
                .addFormDataPart("intensity", form.format(Math.floor(intensity*10)/10))
                .build();

        Request request = new Request.Builder()
                // IPv4 Address와 Port Number는 서버에 맞게 지정
                .url("http://223.194.32.71:5000/speech")
                .post(requestBody)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                mRecordLabel.setText("서버에 음성 파일 전송을 실패했어요");
            }

            @Override
            public void onResponse(Call call, final Response response) throws IOException {
                mRecordLabel.setText("음성이 변환 중입니다...");
                try {
                    Thread.sleep(10000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                getSendFile();

                if(file_response == false){
                    mRecordLabel.setText("음성을 변환하는데 실패했어요");
                }
                else {
                    mRecordLabel.setText("변환된 음성이 나옵니다!!");
                    mp = new MediaPlayer();
                    mp.setDataSource(EXTERNAL_STORAGE_PATH + "/genie_output.mp3");
                    mp.prepare();
                    mp.start();
                }
            }
        });
    }

    public boolean getSendFile() {
        OkHttpClient client = new OkHttpClient();

        HttpUrl mySearchUrl = new HttpUrl.Builder()
                .scheme("http")
                .host("223.194.32.71")
                .port(5000)
                .addPathSegment("result")
                .setQueryParameter("uuid", uuid)
                .setQueryParameter("request_time", request_time)
                .build();

        // GET 10초 후 한 번
        Request request = new Request.Builder()
                .url(mySearchUrl)
                .method("GET", null)
                .build();

        try {
            Response response = client.newCall(request).execute();
            body = response.body();
            file_response = writeResponseBodyToDisk(body);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    private boolean writeResponseBodyToDisk(ResponseBody body) {
        try {
            // todo change the file location/name according to your needs
            File futureStudioIconFile = new File(EXTERNAL_STORAGE_PATH + "/genie_output.mp3");
            InputStream inputStream = null;
            OutputStream outputStream = null;
            try {
                byte[] fileReader = new byte[4096];
                long fileSize = body.contentLength();
                long fileSizeDownloaded = 0;
                inputStream = body.byteStream();
                outputStream = new FileOutputStream(futureStudioIconFile);
                while (true) {
                    int read = inputStream.read(fileReader);
                    if (read == -1) {
                        break;
                    }
                    outputStream.write(fileReader, 0, read);
                    fileSizeDownloaded += read;
                    Log.d("file_read", "file download: " + fileSizeDownloaded + " of " + fileSize);
                }
                outputStream.flush();
                return true;
            } catch (IOException e) {
                return false;
            } finally {
                if (inputStream != null) {
                    inputStream.close();
                }
                if (outputStream != null) {
                    outputStream.close();
                }
            }
        } catch (IOException e) {
            return false;
        }
    }

    private String getMimeType(String path){
        String extension = MimeTypeMap.getFileExtensionFromUrl(path);
        return MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension);
    }

    public void showDialog(View v) {
        final CharSequence[] oItems = {"Neutral", "Happy", "Anger", "Sleepy", "Disgust", "Fear"};

        AlertDialog.Builder oDialog = new AlertDialog.Builder(this,
                android.R.style.Theme_DeviceDefault_Light_Dialog_Alert);

        oDialog.setTitle("감정을 선택하세요")
                .setSingleChoiceItems(oItems, -1, new DialogInterface.OnClickListener()
                {
                    @Override
                    public void onClick(DialogInterface dialog, int which)
                    {
                        nSelectItem = which;
                    }
                })
                .setNeutralButton("선택", new DialogInterface.OnClickListener()
                {
                    public void onClick(DialogInterface dialog, int which)
                    {
                        emotion = oItems[nSelectItem].toString();
                        mEmotionLabel.setText(getResources().getString(R.string.emotion_selection, emotion));
                        mRecordLabel.setText("감정의 정도를 선택하세요");
                    }
                })
                .show();
    }
    public void showVolumeDialog(View v) {
        AlertDialog.Builder alert = new AlertDialog.Builder(this,
                android.R.style.Theme_DeviceDefault_Light_Dialog_Alert);
        LayoutInflater inflater = getLayoutInflater();
        View view = inflater.inflate(R.layout.volume_control, null);
        alert.setView(view);

        alert.setTitle("감정의 정도를 조절하세요");

        SeekBar seekbar = (SeekBar) view.findViewById(R.id.seekBar);
        final TextView intensityNum = (TextView) view.findViewById(R.id.intensityNum);

        seekbar.setProgress(1);
        seekbar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                intensity = seekBar.getProgress();
                intensityNum.setText(form.format(Math.floor(intensity) * 0.1));
            }

            public void onStartTrackingTouch(SeekBar arg0) {
            }

            public void onStopTrackingTouch(SeekBar seekBar) {
            }
        });

        alert.setPositiveButton("선택", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                intensity = intensity * 0.1;
                mIntensityLabel.setText(getResources().getString(R.string.intensity_selection, intensity));
            }
        });
        alert.show();
        mRecordLabel.setText("업로드를 누르고 10초간 기다리세요");
    }
}