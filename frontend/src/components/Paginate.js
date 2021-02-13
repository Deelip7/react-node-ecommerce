import React from 'react';
import { withRouter } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';

const Paginate = ({ totalPages, selectedPage, isAdmin = false, keyword = '', history, match }) => {
  const pageNumber = match.params.pageNumber;
  const handlePaginationChange = (e, { activePage }) => {
    history.push(`/page/${activePage}`);
  };
  return (
    totalPages > 1 && (
      <Pagination activePage={pageNumber} style={{ margin: '0 auto' }} totalPages={totalPages - 1} onPageChange={handlePaginationChange} firstItem={null} lastItem={null} pointing secondary />
    )
  );
};

export default withRouter(Paginate);
