import React, { useState, useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { ArrowLeft, ArrowRight } from '@material-ui/icons'

const styles = makeStyles(theme => ({
  calender: {
    border: "1px solid lightgray",
    width: 350,
    margin: "0px auto",
    padding: "0 16px",
    borderLeft: "1px solid lightgray",
    borderTop: "1px solid lightgray",
    ['@media(max-width: 400px)']: {
      width: "90%",
    }
  },
  calenderTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrowIcon: {
    margin: "0 16px"
  },
  weekDays: {
    listStyleType: "none",
    padding: 0,
  },
  date: {
    display: "inline-block",
    width: "14.2%",
    textAlign: "center",
    marginBottom: "8px",
  },
  dateText: {
    cursor: "pointer"
  },
  selected: {
    background: "yellow"
  },
  graySelected: {
    background: "lightgray"
  }
}))

export default function App() {
  const classes = styles()
  const [weekStartDay, setWeekStartDay] = useState()
  const [date, setDate] = useState(new Date())
  const [month, setMonth] = useState(date.getMonth())
  const [year, setYear] = useState(date.getFullYear())
  const [daysInMonth, setDaysInMonth] = useState(new Date(year, month + 1, 0))

  useEffect(() => {
    let _temp = new Date(year, month + 1, 0)
    setDaysInMonth(_temp.getDate())
    setYear(_temp.getFullYear())
  }, [month, year])

  useEffect(() => {
    let _temp = new Date(year, month, 1)
    setWeekStartDay(_temp.getDay())
  }, [month, year])

  const monthName = () => {
    let _date = new Date(year, month + 1, 0)
    let _monthName = _date.toLocaleString('default', { month: 'long' })
    return _monthName
  }

  const onLeftArrowClick = () => {
    if (month === 0) setYear(year - 1)
    setMonth((month + 12 - 1) % 12)
  }
  const onRightArrowClick = () => {
    if (month === 11) setYear(year + 1)
    setMonth((month + 12 + 1) % 12)
  }

  const handleDateSelection = (e) => {
    let _date = parseInt(e.target.textContent)
    setDate(new Date(year, month, _date))
  }
  const dateStylingClass = (payload) => {
    let _classes = `${classes.date} `
    let selected = date.getDate() === payload && date.getMonth() === month
    let graySelected = date.getDate() === payload && date.getMonth() !== month
    if (selected) _classes = _classes + `${classes.selected}`
    else if (graySelected) _classes = _classes + `${classes.graySelected}`
    return _classes
  }

  return (
    <div>
      <Box textAlign="center" mt={2}>
        <Typography
          variant="h5"
          gutterBottom >
          Calender {year}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom >
          Selected Date: {date.toDateString()}
        </Typography>
      </Box>
      <Paper className={classes.calender} elevation={10}>
        <div className={classes.calenderTitle}>
          <IconButton
            className={classes.arrowIcon}
            size="small"
            onClick={onLeftArrowClick}>
            <ArrowLeft />
          </IconButton>
          <h4 style={{ textAlign: "center" }}>
            {monthName()}, {year}
          </h4>
          <IconButton
            className={classes.arrowIcon}
            size="small"
            onClick={onRightArrowClick}>
            <ArrowRight />
          </IconButton>
        </div>
        <ul className={classes.weekDays}>
          {
            ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day, i) => (
              <li key={i} className={classes.date}>
                <Typography variant="caption">
                  {day.toUpperCase()}
                </Typography>
              </li>
            ))
          }
          {
            [...new Array(weekStartDay)].map((elem, i) => (
              <li className={classes.date} key={i}></li>
            ))
          }
          {
            [...new Array(daysInMonth)].map((elem, i) => (
              <li
                className={dateStylingClass(i + 1)}
                key={i}
                onClick={handleDateSelection}>
                <Typography variant="caption" className={classes.dateText}>
                  {i + 1}
                </Typography>
              </li>
            ))
          }
        </ul>
      </Paper>
    </div>
  )
}