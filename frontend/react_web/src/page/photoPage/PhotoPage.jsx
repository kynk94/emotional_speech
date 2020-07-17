import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import React, { useCallback, useMemo, useState } from 'react'

import imgGenie from '../../assets/0618.jpg'
import imgSH from '../../assets/sh2.jpg'
import imgMS from '../../assets/ms.jpg'
import imgYJ from '../../assets/yj.jpg'
import PhotoCard from './PhotoCard'
import imgJW from '../../assets/jw.jpg'
import imgMJ from '../../assets/mj.png'
import imgIG from '../../assets/ig.png'
import imgDY from '../../assets/dy.jpg'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  faceavatar: {
    backgroundColor: '#2196f3',
    display: 'inline-block',
    '&:not(:first-of-type)': {
      marginLeft: 0
    }
  }
}))

export default function PhotoPage() {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded)
  }, [expanded])

  const faces = useMemo(() => {
    const faceUrls = [
      imgMJ,
      imgMS,
      imgSH,
      imgYJ,
      imgJW,
      imgIG,
      imgDY
    ]
    return faceUrls.map((faceUrl) => (
      <Avatar className={classes.faceavatar} key={faceUrl} src={faceUrl} />
    ))
  }, [classes])

  return (
    <Grid className={classes.root} container justify="center" spacing={2}>
      <PhotoCard
        avatar="T"
        contentText="Generate Emotion, 네가 원하는 대로"
        contentRests={faces}
        expanded={expanded}
        imageAlt="GENIE"
        imageSrc={imgGenie}
        timeLine="July 18, 2020"
        title="Tobigs Project Team : GENIE"
        trailContentText="강인구 김미성 김수현 신민정 신윤종 이도연 정주원"
        trailContentTitle="About us:"
        onUpdateExpanded={handleExpandClick}
      />
      <PhotoCard
        avatar="SH"
        contentText="Soohyun Kim"
        expanded={expanded}
        imageAlt="SH"
        imageSrc={imgSH}
        timeLine="July 18, 2020"
        title="Soohyun Kim"
        trailContentText="shkim@vt.edu"
        trailContentTitle="안녕하세요, 김수현입니다"
        onUpdateExpanded={handleExpandClick}
      />
      <PhotoCard
        avatar="MS"
        contentText="Misung Kim"
        expanded={expanded}
        imageAlt="MS"
        imageSrc={imgMS}
        timeLine="July 18, 2020"
        title="Misung Kim"
        trailContentText="https://github.com/MiSungKim"
        trailContentTitle="pinklike23@gmail.com"
        onUpdateExpanded={handleExpandClick}
      />
      <PhotoCard
        avatar="YJ"
        contentText="Yoonjong Shin"
        expanded={expanded}
        imageAlt="YJ"
        imageSrc={imgYJ}
        timeLine="July 18, 2020"
        title="Yoonjong Shin"
        trailContentText="github.com/yoonjong12"
        trailContentText2="감정을 잃어버렸습니다..."
        trailContentTitle="yjs7658@gmail.com"
        onUpdateExpanded={handleExpandClick}
      />
      <PhotoCard
        avatar="JW"
        contentText="Juwon Jung"
        expanded={expanded}
        imageAlt="JW"
        imageSrc={imgJW}
        timeLine="July 18, 2020"
        title="Juwon Jung"
        trailContentText=""
        trailContentTitle="안녕하세요, 정주원입니다"
        onUpdateExpanded={handleExpandClick}
      />
      <PhotoCard
        avatar="MJ"
        contentText="Minjung Shin"
        expanded={expanded}
        imageAlt="MJ"
        imageSrc={imgMJ}
        timeLine="July 18, 2020"
        title="Minjung Shin"
//        trailContentText="안녕하세요, 신민정입니다"
        trailContentText="https://github.com/minjung-s"
        trailContentTitle="smj139052@naver.com"
        onUpdateExpanded={handleExpandClick}
      />
      <PhotoCard
        avatar="IG"
        contentText="Ingu Kang"
        expanded={expanded}
        imageAlt="IG"
        imageSrc={imgIG}
        timeLine="July 18, 2020"
        title="Ingu Kang"
        trailContentText="github.com/kynk94"
        trailContentTitle="안녕하세요, 강인구입니다"
        onUpdateExpanded={handleExpandClick}
      />
       <PhotoCard
        avatar="DY"
        contentText="Doyeon Lee"
        expanded={expanded}
        imageAlt="DY"
        imageSrc={imgDY}
        timeLine="July 18, 2020"
        title="Doyeon Lee"
        trailContentText="https://github.com/omocomo"
        trailContentTitle="omocomo@naver.com"
        onUpdateExpanded={handleExpandClick}
      />
   </Grid>
  )
}
