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

const initialData = [
  { time: 1, value: 4.11 },
  { time: 2, value: 2.39 },
  { time: 3, value: 1.37 },
  { time: 4, value: 1.16 },
  { time: 5, value: 2.29 },
  { time: 6, value: 3 },
  { time: 7, value: 0.53 },
  { time: 8, value: 2.52 },
  { time: 9, value: 1.79 },
  { time: 10, value: 2.94 },
  { time: 11, value: 4.3 },
  { time: 12, value: 4.41 },
  { time: 13, value: 2.1 },
  { time: 14, value: 8 },
  { time: 15, value: 0 },
  { time: 16, value: 9 },
  { time: 17, value: 3 },
  { time: 18, value: 2 },
  { time: 19, value: 3 },
  { time: 20, value: 7 }
];

const getAxisYDomain = (from, to, ref, offset) => {
  const refData = initialData.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];
  refData.forEach(d => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

const initialState = {
  data: initialData,
  left: "dataMin",
  right: "dataMax",
  refAreaLeft: "",
  refAreaRight: "",
  top: "dataMax+1",
  bottom: "dataMin-1",
  animation: true
};

export default class ZoomChart extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/highlight-zomm-line-chart-v77bt";

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  zoom() {
    let { refAreaLeft, refAreaRight } = this.state;
    const { data } = this.state;

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
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, "value", 1);

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
          Zoom Out
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
