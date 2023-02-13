/**
 * Example showcasing Line Series feature for coloring line dynamically based on separate Value data set
 */

const lcjs = require('@arction/lcjs')
const {
    lightningChart,
    UIElementBuilders,
    UIOrigins,
    PalettedFill,
    LUT,
    ColorRGBA,
    regularColorSteps,
    emptyLine,
    AxisTickStrategies,
    Themes,
} = lcjs

const chart = lightningChart()
    .ChartXY({
        // theme: Themes.darkGold
    })
    .setTitle('Loading example data ...')
    .setAutoCursor((cursor) => cursor.setTickMarkerXVisible(false).setTickMarkerYVisible(false))

const theme = chart.getTheme()
const axisX = chart.getDefaultAxisX()
const axisY = chart.getDefaultAxisY()
chart.getDefaultAxes().forEach((axis) => axis.setTickStrategy(AxisTickStrategies.Empty).setStrokeStyle(emptyLine))

const lineSeries = chart
    .addLineSeries({ individualLookupValuesEnabled: true })
    .setCursorSolveBasis('nearest')
    .setCursorInterpolationEnabled(false)
    .setStrokeStyle((stroke) => stroke.setThickness(10))

const labelStart = chart.addUIElement(UIElementBuilders.TextBox, { x: axisX, y: axisY }).setVisible(false)

const dataSources = [
    {
        name: 'Speed',
        file: 'demo-data-speed.json',
        lut: new LUT({
            steps: regularColorSteps(0, 50, theme.examples.intensityColorPalette),
            interpolate: true,
            units: 'km/h',
        }),
        format: (value) => `${value.toFixed(1)} km/h`,
    },
    {
        name: 'Steering',
        file: 'demo-data-steering.json',
        lut: new LUT({
            steps: [
                { value: -100, color: ColorRGBA(255, 255, 0) },
                { value: 0, color: ColorRGBA(255, 255, 255) },
                { value: 100, color: ColorRGBA(0, 0, 255) },
            ],
            interpolate: true,
            units: '%',
        }),
        format: (value) => `${value.toFixed(1)} %`,
    },
    {
        name: 'Throttle',
        file: 'demo-data-throttle.json',
        lut: new LUT({
            steps: regularColorSteps(0, 100, theme.examples.intensityColorPalette),
            interpolate: true,
            units: '%',
        }),
        format: (value) => `${value.toFixed(1)} %`,
    },
]

let legend
const displayDataSource = async (sourceName) => {
    // CLeanup previously displayed data source
    if (legend) {
        legend.dispose()
        legend = undefined
    }

    const dataSource = dataSources.find((item) => item.name === sourceName)
    let data = dataSource.data
    if (!data) {
        console.time(`Load data set ${sourceName}`)
        data = await fetch(document.head.baseURI + `examples/assets/0052/${dataSource.file}`).then((r) => r.json())
        dataSource.data = data
        console.timeEnd(`Load data set ${sourceName}`)
    }

    lineSeries
        .clear()
        .setName(sourceName)
        .add(data)
        .setStrokeStyle((stroke) => stroke.setFillStyle(new PalettedFill({ lut: dataSource.lut })))
        .setCursorResultTableFormatter((builder, _, __, ___, dataPoint) =>
            builder.addRow(sourceName).addRow(dataPoint.value ? dataSource.format(dataPoint.value) : ''),
        )

    const start = data[0]
    labelStart.setVisible(true).setPosition(start).setOrigin(UIOrigins.CenterBottom).setMargin(10).setText('START')

    chart.setTitle(`Racecar ${sourceName} progression during 1 lap`)

    legend = chart.addLegendBox().add(chart)
}
displayDataSource('Speed')

// Embed HTML UI inside the chart for selecting between different data sources.
const uiDiv = document.createElement('div')
chart.engine.container.append(uiDiv)
uiDiv.style.position = 'absolute'
uiDiv.style.top = `${chart.getTitleMargin().top}px`
uiDiv.style.right = `${chart.getPadding().right}px`
const inputDataSource = document.createElement('select')
uiDiv.append(inputDataSource)
dataSources.forEach((dataSource) => {
    const option = document.createElement('option')
    inputDataSource.append(option)
    option.innerHTML = dataSource.name
})
inputDataSource.onchange = (e) => {
    displayDataSource(e.target.value)
}
