import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'


const useStyles1= makeStyles({
    typography :{
        color : '#775DD0',
        fontFamily: 'NanumSquare_acB'
    }
})


const useStyles2= makeStyles({
    typography :{
        //color : '#775DD0',
        fontFamily: 'NanumSquare_acL'
    }
})


export default function IntroducePJ(){
    const classes1 = useStyles1()
    const classes2 = useStyles2()
    return (
        <div>
        <br></br>
        <br></br>
        <Typography align='center' className = {classes1.typography} variant="h4">
        감정 기반 음성 변환 - 지니(Genie):Generate Emotion
        </Typography>
        <br></br>
        <Typography  align='center' className = {classes2.typography} variant="h5">
        <p>안녕하세요, Tobig's 컨퍼런스 음성조 입니다.</p>
        <p>이 프로젝트는 <b>"감정이 없는 인공지능 친구들의 목소리에 감정을 담아보면 어떨까?"</b>
        하는 아이디어를 바탕으로 시작 되었습니다.</p>
        <p>먼저 6종류의 감정이 담긴 음성 Data 를 모았고,</p>
        <p>전처리 과정을 거친 후 RelGAN 모델을 기반으로 학습을 진행했습니다.</p>
        <p>결과는 이 페이지에서 음성 파일 업로드 또는 녹음을 통해 직접 확인해보세요!</p>
        </Typography>
        </div>
    )
}