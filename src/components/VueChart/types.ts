// SeriesOption类型声明文件
import type {
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
  RadarSeriesOption,
  ScatterSeriesOption,
  EffectScatterSeriesOption
} from 'echarts/charts'
// ComponentOption类型声明文件
import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
  LegendComponentOption,
  MarkLineComponentOption,
  MarkPointComponentOption,
  MarkAreaComponentOption,
  DataZoomComponentOption,
  VisualMapComponentOption,
  ToolboxComponentOption
} from 'echarts/components'
// ECharts核心类型声明文件
import type {
  ComposeOption
} from 'echarts/core'
// 导出ECharts的Option类型
export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | RadarSeriesOption
  | ScatterSeriesOption
  | EffectScatterSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | LegendComponentOption
  | MarkLineComponentOption
  | MarkPointComponentOption
  | MarkAreaComponentOption
  | DataZoomComponentOption
  | VisualMapComponentOption
  | ToolboxComponentOption
>