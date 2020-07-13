import Avatar from '@material-ui/core/Avatar'
import Collapse from '@material-ui/core/Collapse'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { Card, CardActions, CardContent, CardHeader, CardMedia } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ShareIcon from '@material-ui/icons/Share'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import Divider from '@material-ui/core/Divider'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  divider: {
    margin: '10px'
  },
  image: {
    flex: 1,
    height: '300px',
    weight: '300px',
    resizeMode: 'contain',
    paddingTop: '0%' // 16:9
  },
  avatar: {
    backgroundColor: '#2196f3'
  },
  contentText: {
    fontFamily: 'NanumSquare_acB'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  content: {
    height: '75px'
  },
  trailContent: {
    height: '130px',
    overflow: 'scroll'
  }
}))

export default function PhotoCard({
  avatar,
  contentText,
  contentRests,
  expanded = false,
  imageAlt = '',
  imageSrc,
  timeLine,
  title,
  trailContentText,
  trailContentTitle,
  onUpdateExpanded
}) {
  const classes = useStyles()
  return (
    <Grid item className={classes.root}>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {avatar}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={timeLine}
        />
        <CardMedia className={classes.image} src={imageSrc} component="img" title={imageAlt} />
        <CardContent className={classes.content}>
          <Typography variant="body2" color="textSecondary" className={classes.contentText}>
            {contentText}
          </Typography>
          <Divider className={classes.divider} light />
          {contentRests}
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
              [classes.expandOpen]: expanded
            })}
            onClick={onUpdateExpanded}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {trailContentTitle && (
            <CardContent className={classes.trailContent}>
              <Typography paragraph>{trailContentTitle}</Typography>
              <Typography paragraph>{trailContentText}</Typography>
            </CardContent>
          )}
        </Collapse>
      </Card>
    </Grid>
  )
}

PhotoCard.propTypes = {
  avatar: PropTypes.object.isRequired,
  contentText: PropTypes.string.isRequired,
  contentRests: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired,
  imageAlt: PropTypes.string.isRequired,
  imageSrc: PropTypes.object.isRequired,
  timeLine: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  trailContentText: PropTypes.string.isRequired,
  trailContentTitle: PropTypes.string.isRequired,
  onUpdateExpanded: PropTypes.func.isRequired
}
