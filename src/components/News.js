import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general',
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    };
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        };
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - CurrentTides`;
    }

    // ✅ Generalized function to fetch news
    updateNews = async (page) => {
        this.setState({ loading: true });
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
        
        try {
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false,
                page: page
            });
        } catch (error) {
            console.error("Error fetching news:", error);
            this.setState({ loading: false });
        }
    };

    componentDidMount() {
        this.updateNews(this.state.page);
    }

    // handlePrevClick = () => {
    //     if (this.state.page > 1) {
    //         this.updateNews(this.state.page - 1);
    //     }
    // };

    // handleNextClick = () => {
    //     const totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);
    //     if (this.state.page < totalPages) {
    //         this.updateNews(this.state.page + 1);
    //     }
    // };
    fetchMoreData = async () => {
        this.setState({ loading: true });
    
        // Corrected: Use this.state.page + 1 instead of page
        const nextPage = this.state.page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
    
        try {
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: this.state.articles.concat(parsedData.articles), // Append new articles
                totalResults: parsedData.totalResults,
                loading: false,
                page: nextPage // Update page state correctly
            });
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };
    
    render() {
        const totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);

        return (
            <div className='container my-4'>
                <h2 className='text-center' style={{margin:'35px 0px'}}>Top Headlines - {this.capitalizeFirstLetter(this.props.category)}</h2>
                {/* {this.state.loading && <Loading />} */}
                {/* we are now using infine scroll hence commenting it */}
                <InfiniteScroll
                        dataLength={this.state.articles ? this.state.articles.length : 0} // ✅ Fallback to 0 if undefined
                        next={this.fetchMoreData}
                        hasMore={this.state.articles?.length !== this.state.totalResults} // ✅ Use optional chaining
                        loader={<h4><Loading /></h4>}
                    >
                        
                <div className='row'>
                    {this.state.articles.map((element) => (
                            <div className='col-md-4' key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title.slice(0, 44) : " "}
                                    description={element.description ? element.description.slice(0, 88) : " "}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                />
                            </div>
                        ))}
                </div>
                </InfiniteScroll>
                {/* <div className='container d-flex justify-content-between'>
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>
                        &larr; Previous
                    </button>
                    <button type="button" disabled={this.state.page >= totalPages} className="btn btn-dark" onClick={this.handleNextClick}>
                        Next &rarr;
                    </button>
                </div> */}
            </div>
        );
    }
}

export default News;
