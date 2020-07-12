
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import img1 from './all.jpg';
import img2 from './shphoto.jpg';
import img3 from './ms.jpg';
import img4 from './yj.jpg';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
 

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    justifyContent: 'space-between', flexDirection: 'column'},
  media: {
    height: 0,
    paddingTop: '0%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: blue[500],
    
  },
  faceavatar: {
    backgroundColor: blue[500],
    display: "inline-block",
    "&:not(:first-of-type)": {
      marginLeft: 0
    }
  },
  typography :{
    //color : '#775DD0',
    fontFamily: 'NanumSquare_acB'
  }

}));

export default function Cardimages() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const faces = [
    "http://i.pravatar.cc/300?img=1",
    "http://i.pravatar.cc/300?img=2",
    "http://i.pravatar.cc/300?img=3",
    "http://i.pravatar.cc/300?img=4"
  ];

  //render(){
  return (
    <Grid container alignItems="stretch" >
      <Grid item style={{display: 'flex', padding:40}}>

        <Card className={classes.root}>
          
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                T
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Tobigs Project Team : GENIE"
            subheader="July 18, 2020"
          />
          <CardMedia
            className={classes.media}
            //image='aaa.png'
            //style={{ height: "350px" }}
            style={{flex: 1,
              height: "300px",
              weight: "300px",
              resizeMode: 'contain'}}
            src={img1}
            component="img"
            title="SH"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.typography}>
              Generate Emotion, 네가 원하는 대로
            </Typography>
            <Typography paragraph>
                
            </Typography>
            <Divider className={classes.divider} light />
              {faces.map(face => (
                <Avatar className={classes.faceavatar} key={face} src={face} />
              ))}
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>

            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>About us:</Typography>
              <Typography paragraph className={classes.typography}>
                강인구 김미성 김수현 신민정 신윤종 이도연 정주원
              </Typography>
              <Typography paragraph>
                -
              </Typography>
              <Typography paragraph>
                -
              </Typography>
              <Typography>
                -
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>


      <Grid item style={{display: 'flex', padding:40}}>

        <Card className={classes.root} > 
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                SH
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Soohyun Kim"
            subheader="July 18, 2020"
          />
          <CardMedia
            className={classes.media}
            //image='aaa.png'
            //style={{ height: "350px" }}
            style={{flex: 1,
              height: "300px",
              weight: "300px",
              resizeMode: 'contain'}}
            src={img2}
            component="img"
            title="SH"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.typography}> 
              Soohyun Kim
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>

            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>About me:</Typography>
              <Typography paragraph className={classes.typography}>
                안녕하세요
              </Typography>
              <Typography paragraph className={classes.typography}>
                Hi there
              </Typography>
              <Typography paragraph>
                -
              </Typography>
              <Typography>
                -
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>

      <Grid item style={{display: 'flex', padding:40}}>

        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                MS
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Misung Kim"
            subheader="July 18, 2020"
          />
          <CardMedia
            className={classes.media}
            //image='aaa.png'
            //style={{ height: "350px" }}
            style={{flex: 1,
              height: "300px",
              weight: "300px",
              resizeMode: 'contain'}}
            src={img3}
            component="img"
            title="SH"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Misung Kim
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>

            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>About me:</Typography>
              <Typography paragraph>
                안녕하세요
              </Typography>
              <Typography paragraph>
                김미성입니다
              </Typography>
              <Typography paragraph>
                
              </Typography>
              <Typography>
                
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>

      <Grid item style={{display: 'flex', padding:40}}>

        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                YJ
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Yoonjong Shin"
            subheader="July 18, 2020"
          />
          <CardMedia
            className={classes.media}
            //image='aaa.png'
            //style={{ height: "350px" }}
            style={{flex: 1,
              height: "300px",
              weight: "300px",
              resizeMode: 'contain'}}
            src={img4}
            component="img"
            title="YJ"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Yoonjong Shin
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>

            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>About me:</Typography>
              <Typography paragraph>
                안녕하세요,
              </Typography>
              <Typography paragraph>
                신윤종입니다.
              </Typography>
              <Typography paragraph>
                
              </Typography>
              <Typography>
                
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </Grid>

  );
  //}
}
