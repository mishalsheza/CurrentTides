import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let{source,title,description,imageUrl,newsUrl,author,publishedAt} = this.props
    return (
      <div>
        <div className="card my-3">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1',left:'90%'}}>{source}</span>
            <img src ={!imageUrl?"https://static.files.bbci.co.uk/ws/simorgh-assets/public/sport/images/metadata/poster-1024x576.png":imageUrl} alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text mb-0"><small className="text-muted">By : {!author?"Unknown" :author}</small></p>
                <p className="card-text"><small className="text-muted">Published On:{new Date(publishedAt).toGMTString()}</small></p>

                <a href={newsUrl} target = "_blank" className="btn btn-primary">Read More</a>

            </div>
        </div>     
    </div>
    )
  }
}

export default NewsItem
