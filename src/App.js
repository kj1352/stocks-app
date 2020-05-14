import React from 'react';
import logo from './assets/arrows.svg';
import './css/home.css';
import ReactDOM from 'react-dom';
import moment from 'moment';
import ChartistGraph from 'react-chartist';
import axios from 'axios';

// MOCK DATA
function allCompanies() {
    return [
    	{ "symbol": "A", "name": "Agilent Technologies Inc", "industry": "Health Care" },
    	{ "symbol": "AAL", "name": "American Airlines Group", "industry": "Industrials" },
    	{ "symbol": "AAP", "name": "Advance Auto Parts", "industry": "Consumer Discretionary" },
    	{ "symbol": "AAPL", "name": "Apple Inc.", "industry": "Information Technology" },
    	{ "symbol": "ABBV", "name": "AbbVie Inc.", "industry": "Health Care" },
    	{ "symbol": "ABC", "name": "Amerisource Bergen Corp", "industry": "Health Care" }
    ];
}

// MOCK DATA
function companyHistory() {
    return [
        {"timestamp":"2020-03-23T14:00:00.000Z","symbol":"AAPL","name":"Apple Inc.","industry":"Information Technology","open":228.08, "high":228.5,"low":212.61,"close":224.37,"volumes":83134900},
        {"timestamp":"2020-03-22T14:00:00.000Z","symbol":"AAPL","name":"Apple Inc.","industry":"Information Technology","open":247.18, "high":251.83,"low":228,"close":229.24,"volumes":100423000},
        {"timestamp":"2020-03-19T14:00:00.000Z","symbol":"AAPL","name":"Apple Inc.","industry":"Information Technology","open":247.385, "high":252.84,"low":242.61,"close":244.78,"volumes":67964300},
        {"timestamp":"2020-03-18T14:00:00.000Z","symbol":"AAPL","name":"Apple Inc.","industry":"Information Technology","open":239.77, "high":250,"low":237.12,"close":246.67,"volumes":75058400},
    ];
}


// HTTP Request
function getCompanyList() {
    return axios.get('https://jsonplaceholder.typicode.com/todos');
}

// Line Graph Component
class LineGraph extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() {
        let data = {
            labels: this.props.labels,
            series: [
                this.props.series
            ]
        };

        let options = {
            high: 400,
            low: 0,
            responsive: true,
            axisY: {
                showGrid: true,
            },
            axisX: {
                showGrid: false,
            },
        }

        let type = 'Line';

        return (
            <div className="graph">
                <h2> Closing </h2>

                <ChartistGraph className="line-graph" data={data} options={options} type={type} />
            </div>
        );
    }
}


// History Table
class CompanyDetailsTable extends React.Component {
    constructor(props) {
        super(props);
        this.history = companyHistory();

        this.labels = this.history.map(history => moment(history.timestamp).format('DD/MM/YYYY'));

        this.series = this.history.map(history => history.close);

        this.state = {
            searchableDate: null
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleDateFilter = this.handleDateFilter.bind(this);
    }

    handleDateChange(event) {
        this.setState({
            searchableDate: event.target.value
        });
    }

    handleDateFilter() {
        console.log(this.state);
        // TODO: Do HTTP request here and forceupdate to filter
    }

    render() {
        let companyDetailsList = <section>
            <div className="filter-bar">
                <input placeholder="Search by Symbol" type="date" onChange={this.handleDateChange}/>
                <button onClick={this.handleDateFilter}> Seach </button>
                <button> Clear </button>
            </div>

            <table>
                <tbody>
                    <tr>
                        <th> Date </th>
                        <th> Open </th>
                        <th> High </th>
                        <th> Low </th>
                        <th> Close </th>
                        <th> Volumes </th>
                    </tr>
                    { this.history.map((history, i) => {
                        return (
                            <tr key={ i }>
                                <td>
                                    {moment(history.timestamp).format('DD/MM/YYYY')}
                                </td>
                                <td>
                                    {history.open}
                                </td>
                                <td>
                                    {history.high}
                                </td>
                                <td>
                                    {history.low}
                                </td>
                                <td>
                                    {history.close}
                                </td>
                                <td>
                                    {history.volumes}
                                </td>
                            </tr>
                        );
                    }) }
                </tbody>
            </table>
            <LineGraph labels={this.labels} series={this.series} />
        </section>;

        return companyDetailsList;
    }
}


// Stocks company list table
class CompanyListTable extends React.Component {
    constructor() {
        super();

        this.state = {
            symbolSearchText: '',
            industrySearchText: '',
            showCompanyDetails: false
        };

        // Change the URL in the getCompanyList() function to get the actual data
        getCompanyList().then((data) => {
            console.log(data.data);
        }, (err) => {
            console.log(err);
        });

        // Assign the company data to this.companies after you get the result from http the above promise function
        this.companies = allCompanies();

        this.handleSymbolChange = this.handleSymbolChange.bind(this);
        this.handleIndustryChange = this.handleIndustryChange.bind(this);
    }

    filterTable() {
        // TODO: Do HTTP request here and forceupdate to filter

        // Below module is for local search and you need to do http request to get the data from server
        this.companies = allCompanies().map((company) => company).filter((company) => {
            return company.symbol.toString().toLowerCase().includes(this.state.symbolSearchText.toLowerCase()) &&
            company.industry.toString().toLowerCase().includes(this.state.industrySearchText.toLowerCase());
        });

        // Force update once you get the result
        this.forceUpdate();
    }

    resetTable() {
        this.companies = allCompanies();
        this.state = {
            symbolSearchText: '',
            industrySearchText: '',
            showCompanyDetails: false
        };
        this.selectedCompany = null;
        this.forceUpdate();
    }

    handleSymbolChange(event) {
        this.setState({
            symbolSearchText: event.target.value
        });
    }

    handleIndustryChange(event) {
        this.setState({
            industrySearchText: event.target.value
        });
    }

    showCompanyDetails(symbol) {
        this.selectedCompany = symbol;
        this.setState({
            showCompanyDetails: true
        });
    }

    render() {
        let companyList = <section>
            <div className="filter-bar">
                <input placeholder="Search by Symbol" onChange={this.handleSymbolChange}/>
                <input placeholder="Search by Industry" onChange={this.handleIndustryChange}/>
                <button onClick={() => this.filterTable()}> Search </button>
                <button onClick={() => this.resetTable()}> Clear </button>
            </div>

            <table>
                <tbody>
                    <tr>
                        <th> Symbol </th>
                        <th> Name </th>
                        <th> Industry </th>
                    </tr>
                    { this.companies.map((company, i) => {
                        return (
                            <tr key={ i } onClick={() => this.showCompanyDetails(company.symbol)}>
                                <td>
                                    {company.symbol}
                                </td>
                                <td>
                                    {company.name}
                                </td>
                                <td>
                                    {company.industry}
                                </td>
                            </tr>
                        );
                    }) }
                </tbody>
            </table>
        </section>;

        return this.state.showCompanyDetails ? <CompanyDetailsTable company={this.selectedCompany} /> : companyList;
    }
}


// Main App which renders at the beginning
class App extends React.Component {
    constructor() {
        super();

        this.state = {
            showCompanyList: false
        };
    }

    redirectUser() {
        this.setState({
            showCompanyList: true
        });
    }

    render() {
        const welcomeMessage = <div className="welcome">
            <header> <h1> Stock Prices </h1> <img src={logo} className="App-logo" alt="logo" />  </header>
            <p>
                Welcome to the Stock Market Page. You may click on stocks to view all the stocks or search to
                view the latest 100 days of activity.
            </p>
        </div>;

        return (
            <div className="container">
                <nav>
                    <a href="/" className={ !this.state.showCompanyList ? 'active' : '' }> Home </a>
                    <a className={ this.state.showCompanyList ? 'active' : '' } onClick={() => this.redirectUser()}> Stocks </a>
                </nav>
                { this.state.showCompanyList ? <CompanyListTable /> : welcomeMessage }
            </div>
        );
    }
}

export default App;
