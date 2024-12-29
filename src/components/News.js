import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category:'general'
    }
    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string

    }
    constructor(){
        super();
        this.state = {
            articles : [],  
            loading:false,
            page:1          
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=6c69ad862f8e42cf9d4cb01a4d22df05&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
             articles: parsedData.articles , 
             totalResults : parsedData.totalResults , 
             loading : false}); // Correctly calling setState as a method
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=6c69ad862f8e42cf9d4cb01a4d22df05&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false,
        });
    };
    
    handleNextClick = async () => {
        const totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);
        if (this.state.page < totalPages) {
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=6c69ad862f8e42cf9d4cb01a4d22df05&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false,
            });
        }
    };
    
    
  render() {
    const totalPages = Math.ceil(this.state.totalResults / (this.props.pageSize)); // Calculate total pages

    return (
      <div className='container my-4'>
        <h2>Top HeadLines</h2>
        {this.state.loading&& <Loading/>}
        <div className='row'>
        {!this.state.loading && this.state.articles.map((element) => {
            return <div className='col-md-4'  key = {element.url}>
                <NewsItem title={element.title?element.title.slice(0,44):" "} description = {element.description?element.description.slice(0,88):" "} imageUrl = {element.urlToImage} newsUrl={element.url}/>
            </div>
            })}
        </div>
            <div className='container d-flex justify-content-between'>
            <button type="button" disabled = {this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button type="button" disabled={this.state.page >= totalPages} className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
            </div>
      </div>
    )
  }
}

export default News
