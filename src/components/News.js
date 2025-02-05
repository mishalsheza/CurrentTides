import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = ({ category, pageSize, apiKey }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    const fetchNews = async (pageNum, replace = false) => {
        setLoading(true);
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&page=${pageNum}&pageSize=${pageSize}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setArticles(prevArticles => replace ? data.articles : [...prevArticles, ...data.articles]);
            setTotalResults(data.totalResults);
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);  // Reset page when category changes
        fetchNews(1, true); // Replace articles when category changes
    }, [category]);

    const fetchMoreData = async () => {
        if (articles.length >= totalResults) return; // Stop fetching if all articles are loaded
        const nextPage = page + 1;
        setPage(nextPage);
        fetchNews(nextPage);
    };

    return (
        <div className='container my-4'>
            <h2 className='text-center' style={{ margin: '35px 0px' }}>
                Top Headlines - {capitalizeFirstLetter(category)}
            </h2>
            {loading && page === 1 && <Loading />} {/* Show loader only on the first page */}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Loading />}
                endMessage={<p className="text-center my-4">No more articles to load.</p>}
            >
                <div className='row g-4'> {/* Added Bootstrap grid gap for better spacing */}
                    {articles.map((element, index) => (
                        <div className='col-md-4' key={element.url || index}>
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
        </div>
    );
};

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
};

export default News;
