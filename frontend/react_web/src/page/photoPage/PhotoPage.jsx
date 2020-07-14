import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import React, { useCallback, useMemo, useState } from 'react'

import imgGenie from '../../assets/0618.jpg'
import imgSH from '../../assets/shphoto.jpg'
import imgMS from '../../assets/ms.jpg'
import imgYJ from '../../assets/yj.jpg'
import PhotoCard from './PhotoCard'

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
      'http://i.pravatar.cc/300?img=1',
      'http://i.pravatar.cc/300?img=2',
      'http://i.pravatar.cc/300?img=3',
      'http://i.pravatar.cc/300?img=4'
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
        trailContentText="안녕하세요"
        trailContentTitle="About me:"
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
        trailContentText="안녕하세요, 김미성입니다"
        trailContentTitle="About me:"
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
        trailContentText="안녕하세요, 신윤종입니다"
        trailContentTitle="About me:"
        onUpdateExpanded={handleExpandClick}
      />
    </Grid>
  )
}
