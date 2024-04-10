import React from 'react';
import { Button } from './ui/button';

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage }) => {
  const handlePrevious = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < 10) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <div className="my-3 d-flex justify-content-between align-items-center">
        <Button
          className="px-3 py-1 m-1 text-center"
          variant="link"
          onClick={handlePrevious}
        >
          Previous
        </Button>
        <Button
          className="px-3 py-1 m-1 text-center"
          variant="link"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Pagination;
