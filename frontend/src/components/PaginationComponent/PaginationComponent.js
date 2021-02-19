import React from "react";
class PaginationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startPage: 1,
      endPage: 1,
    };
    this.setStartEndPage = this.setStartEndPage.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
  }

  componentDidMount() {
    this.setStartEndPage();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.currentPage !== prevProps.currentPage ||
      this.props.totalItems !== prevProps.totalItems
    ) {
      this.setStartEndPage();
    }
  }

  createMarkup(startPage, endPage) {
    const pages = [...Array(endPage - startPage + 1).keys()].map((page) => (
      <li key={page} className="page-item">
        <button
          className="page-link"
          onClick={() => this.props.handlePageChange(page + startPage)}
        >
          {page + startPage}
        </button>
      </li>
    ));
    return pages;
  }

  setStartEndPage() {
    const { currentPage } = this.props;
    const totalPages = Math.ceil(this.props.totalItems / this.props.pageSize);
    let startPage, endPage;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    this.setState((prevState) => {
      return { ...prevState, startPage, endPage };
    });
  }

  render() {
    const markup = this.createMarkup(this.state.startPage, this.state.endPage);
    return (
      <>
        <nav aria-label="Page navigation example">
          <ul className="pagination">{markup}</ul>
        </nav>
      </>
    );
  }
}

export default PaginationComponent;
