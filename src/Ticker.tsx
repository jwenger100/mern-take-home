import { Component } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

interface ITickerProps {
    tickerSymbol: string;
}

interface ITickerState {
    tickerData: ITickerData[]
}

interface ITickerData {
    date: string;
    nav: string;
    KID: string;
    ticker: string;
    qualifiedTicker: string;
    ISIN: string;
    acmeAssetID: number;
    adjustedPrice: number;
}

export class Ticker extends Component<ITickerProps, ITickerState> {
    constructor(props: ITickerProps) {
        super(props);
        this.state = {
            tickerData: []
        };
    }

    public componentDidMount() {
        fetch('/ticker/LALDX?startDate=2019-12-19&endDate=2021-01-31')
            .then(response => response.json())
            .then(data => this.setState({
                tickerData: data
            }));
    }

    public render() {
        const { tickerSymbol } = this.props;
        const options = {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Price'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    },
                    type: 'time',
                    time: {
                        format: 'MM YYYY',
                        unit: 'month',
                        displayFormats: { month: 'MMM YYYY' }
                    }
                }]
            },
        };
        return (
            <>
                <div className='header'>
                    <h1 className='title'>{`${tickerSymbol} Price Chart`}</h1>
                </div>
                <Line data={this.transformData()} options={options} width={800} height={400} />
            </>
        );
    }

    private transformData = () => {
        const { tickerData } = this.state;
        return {
            datasets: [
                {
                    label: 'Unadjusted Value',
                    data: tickerData.map(item => {
                        return {
                            x: moment(item.date),
                            y: item.nav
                        };
                    }),
                    fill: false,
                    backgroundColor: '#0492C2',
                    borderColor: '#3fe1ff',
                },
                {
                    label: 'Adjusted Value',
                    data: tickerData.map(item => {
                        return {
                            x: moment(item.date),
                            y: item.adjustedPrice
                        };
                    }),
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                },
            ]
        };
    }
}