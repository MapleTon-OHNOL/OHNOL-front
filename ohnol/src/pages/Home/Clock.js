import React, { Component } from "react";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }
  componentWillMount() {
    this.getTimeUntil(this.props.deadline);
  }
  componentDidMount() {
    setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
  }
  getTimeUntil(deadline) {
    const time = Date.parse(deadline) - Date.parse(new Date());
    if (time < 0) {
      this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
        const diffDaysTen = Math.floor((time / (1000*60*60*24))/10);
        const diffDaysOne = Math.floor((time / (1000*60*60*24))%10);
        const diffHoursTen = Math.floor(((time / (1000*60*60)) % 24)/10);
        const diffHoursOne = Math.floor(((time / (1000*60*60)) % 24)%10);
        const diffMinsTen = Math.floor(((time / (1000*60)) % 60)/10);
        const diffMinsOne = Math.floor(((time / (1000*60)) % 60)%10);
        const diffSecsTen = Math.floor((time / 1000 % 60)/10);
        const diffSecsOne = Math.floor((time / 1000 % 60)%10);
      this.setState({ diffDaysTen, diffDaysOne, diffHoursTen, diffHoursOne, diffMinsTen ,diffMinsOne, diffSecsTen, diffSecsOne });
    }
  }
  render() {
    return (
        <>
        <table className="calendar" border="1">
          <tr className="time">
            <th scope="col"><div className="img-cal"><div className="date days-ten"> {this.state.diffDaysTen}</div></div></th>
            <th scope="col"><div className="img-cal"><div className="date days-one"> {this.state.diffDaysOne}</div></div></th>
            <th scope="col" className="dang">:</th>
            <th scope="col"><div className="img-cal"><div className="date hours-ten"> {this.state.diffHoursTen}</div></div></th>
            <th scope="col"><div className="img-cal"><div className="date hours-one"> {this.state.diffHoursOne}</div></div></th>
            <th scope="col" className="dang">:</th>
            <th scope="col"><div className="img-cal"><div className="date minutes-ten"> {this.state.diffMinsTen}</div></div></th>
            <th scope="col"><div className="img-cal"><div className="date minutes-one"> {this.state.diffMinsOne}</div></div></th>
            <th scope="col" className="dang">:</th>
            <th scope="col"><div className="img-cal"><div className="date seconds-ten"> {this.state.diffSecsTen}</div></div></th>
            <th scope="col"><div className="img-cal"><div className="date seconds-one"> {this.state.diffSecsOne}</div></div></th>
          </tr>
          <tr>
            <td className="date-comment" scope="row" colSpan="2">Days</td>
            <td></td>
            <td className="date-comment" scope="row" colSpan="2">Hours</td>
            <td></td>
            <td className="date-comment" scope="row" colSpan="2">Minutes</td>
            <td></td>
            <td className="date-comment" scope="row" colSpan="2">Seconds</td>
          </tr>
        </table>
        </>
    );
  }
}
export default Clock;