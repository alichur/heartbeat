//Mostly from Rechart example docs:  https://recharts.org/en-US/examples/HighlightAndZoomLineChart
import React, { PureComponent } from "react";
import {
  Label,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer
} from "recharts";
import { getDateFromOrphanTime } from "./utils";

export default class ZoomChart extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/highlight-zomm-line-chart-v77bt";
  initialData = [];
  constructor(props) {
    super(props);
    this.initialData = props.data.map(entry => {
      entry.time = getDateFromOrphanTime(entry.time);
      return entry;
    });
    const initialState = {
      data: this.initialData,
      left: "dataMin",
      right: "dataMax",
      refAreaLeft: "",
      refAreaRight: "",
      top: "dataMax+1",
      bottom: "dataMin-1",
      animation: true
    };
    this.state = initialState;
  }
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      let convertedProps = this.props.data.map(entry => {
        entry.time = getDateFromOrphanTime(entry.time);
        return entry;
        // format for display new Date(item).toLocaleTimeString('it-IT')
      });
      this.setState({ data: convertedProps });
    }
  }
  getAxisYDomain(from, to, ref, offset) {
    const refData = this.state.data.slice(from - 1, to);
    try {
      let [bottom, top] = [refData[0][ref], refData[0][ref]];
      refData.forEach(d => {
        if (d[ref] > top) top = d[ref];
        if (d[ref] < bottom) bottom = d[ref];
      });

      return [(bottom | 0) - offset, (top | 0) + offset];
    } catch {}
  }
  zoom() {
    let { refAreaLeft, refAreaRight, data } = this.state;

    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      this.setState(() => ({
        refAreaLeft: "",
        refAreaRight: ""
      }));
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = this.getAxisYDomain(
      data.findIndex(item => item.time === refAreaLeft),
      data.findIndex(item => item.time === refAreaRight),
      "value",
      10
    );

    this.setState(() => ({
      refAreaLeft: "",
      refAreaRight: "",
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top
    }));
  }

  zoomOut() {
    const { data } = this.state;
    this.setState(() => ({
      data: data.slice(),
      refAreaLeft: "",
      refAreaRight: "",
      left: "dataMin",
      right: "dataMax",
      top: "dataMax+1",
      bottom: "dataMin"
    }));
  }

  render() {
    const {
      data,
      barIndex,
      left,
      right,
      refAreaLeft,
      refAreaRight,
      top,
      bottom
    } = this.state;

    return (
      <div
        className="highlight-bar-charts"
        style={{ userSelect: "none", width: "100%" }}
      >
        <button
          type="button"
          className="btn update"
          onClick={this.zoomOut.bind(this)}
        >
          Zoom out
        </button>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={800}
            height={400}
            data={data}
            onMouseDown={e => this.setState({ refAreaLeft: e.activeLabel })}
            onMouseMove={e =>
              this.state.refAreaLeft &&
              this.setState({ refAreaRight: e.activeLabel })
            }
            // eslint-disable-next-line react/jsx-no-bind
            onMouseUp={this.zoom.bind(this)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              allowDataOverflow
              dataKey="time"
              domain={[left, right]}
              type="number"
            />
            <YAxis
              allowDataOverflow
              domain={[bottom, top]}
              type="number"
              yAxisId="1"
            />
            <Tooltip />
            <Line
              yAxisId="1"
              type="natural"
              dataKey="value"
              stroke="#8884d8"
              animationDuration={300}
            />
            <Line
              yAxisId="2"
              type="natural"
              dataKey="impression"
              stroke="#82ca9d"
              animationDuration={300}
            />

            {refAreaLeft && refAreaRight ? (
              <ReferenceArea
                yAxisId="1"
                x1={refAreaLeft}
                x2={refAreaRight}
                strokeOpacity={0.3}
              />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
