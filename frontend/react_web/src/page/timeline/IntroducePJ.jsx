import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'


const useStyles= makeStyles({
    typography :{
        color : '#775DD0'
    }
})


export default function IntroducePJ(){
    const classes = useStyles()
    return (
        <div>
        <br></br>
        <br></br>
        <Typography align='center'  color = '#775DD0' className = {classes.typography} variant="h4">
        감정 기반 음성 변환 - 지니(Genie):Generate Emotion
        </Typography>
        <br></br>
        <Typography align='center' variant="h5">
        <p>안녕하세요, Tobig's 컨퍼런스 음성조 입니다.</p>
        <p>이 프로젝트 "감정이 없는 인공지능 친구들의 목소리"에 감정을 담아보면 어떨까?
        하는 아이디어를 시작으로 프로젝트를 진행하게 되었습니다.</p>
        <p>이에 따라 감정이 담긴 음성 Data 를 모았습니다</p>
        </Typography>
        </div>
    )
}