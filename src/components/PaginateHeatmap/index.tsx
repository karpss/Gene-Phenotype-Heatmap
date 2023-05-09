import React from 'react';
import { Pagination } from 'react-bootstrap';

function PaginateHeatmap({
  page,
  setPage,
  totalHeatMapPages,
}: PaginationProps) {
  const handlePage = (newPage: number) => {
    setPage(newPage);
  };

  const numberOfPages = 5;

  const startPage = Math.max(0, page - Math.floor(numberOfPages / 2));

  return (
    <div>
      {totalHeatMapPages > 1 && (
        <div>
          <Pagination>
            <Pagination.First onClick={() => handlePage(0)} />
            <Pagination.Prev
              onClick={() => handlePage(Math.max(0, page - 1))}
            />
            {startPage > 0 && <Pagination.Ellipsis />}
            {Array.from(
              { length: numberOfPages },
              (_, index) => startPage + index
            )
              .filter((pageIndex) => pageIndex < totalHeatMapPages)
              .map((pageIndex, index) => (
                <Pagination.Item
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  active={pageIndex === page}
                  onClick={() => handlePage(pageIndex)}
                >
                  {pageIndex + 1}
                </Pagination.Item>
              ))}
            {startPage + numberOfPages < totalHeatMapPages && (
              <Pagination.Ellipsis />
            )}
            <Pagination.Next
              onClick={() =>
                handlePage(Math.min(totalHeatMapPages - 1, page + 1))
              }
            />
            <Pagination.Last
              onClick={() => handlePage(totalHeatMapPages - 1)}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default PaginateHeatmap;
