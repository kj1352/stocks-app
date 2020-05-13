import React from 'react';
import logo from './assets/arrows.svg';
import './css/home.css';
import ReactDOM from 'react-dom';


class CompanyListTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            symbolSearchText: '',
            industrySearchText: ''
        };

        this.companies = this.props.companies;

        this.handleSymbolChange = this.handleSymbolChange.bind(this);
        this.handleIndustryChange = this.handleIndustryChange.bind(this);
    }

    filterTable() {
        this.companies = this.props.companies.map((company) => company).filter((company) => {
            return company.symbol.toString().toLowerCase().includes(this.state.symbolSearchText.toLowerCase()) &&
            company.industry.toString().toLowerCase().includes(this.state.industrySearchText.toLowerCase());
        });
        this.forceUpdate();
    }

    resetTable() {
        this.companies = this.props.companies;
        this.state = {
            symbolSearchText: '',
            industrySearchText: ''
        };
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

    render() {
        return (
            <section>
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
                                <tr key={ i }>
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
            </section>
        );
    }

}

function allData() {
    return [
    	{ "symbol": "A", "name": "Agilent Technologies Inc", "industry": "Health Care" },
    	{ "symbol": "AAL", "name": "American Airlines Group", "industry": "Industrials" },
    	{ "symbol": "AAP", "name": "Advance Auto Parts", "industry": "Consumer Discretionary" },
    	{ "symbol": "AAPL", "name": "Apple Inc.", "industry": "Information Technology" },
    	{ "symbol": "ABBV", "name": "AbbVie Inc.", "industry": "Health Care" },
    	{ "symbol": "ABC", "name": "Amerisource Bergen Corp", "industry": "Health Care" }
    ];
}

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
                { this.state.showCompanyList ? <CompanyListTable companies={allData()} /> : welcomeMessage }
            </div>
        );
    }
}

export default App;
