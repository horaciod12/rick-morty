import { Pagination } from "antd";

import classes from "../PaginationCmp/PaginationCmp.module.css";

const PaginationCmp = (props) => {
  const { searchResults, pageSize, current } = props;

  const onHandlePagination = (page) => {
    return props.onHandlePagination(page);
  };

  return (
    searchResults.length > 0 && (
      <div className={classes.containerPag}>
        <Pagination
          pageSize={pageSize}
          current={current}
          total={searchResults.length}
          onChange={onHandlePagination}
        />
      </div>
    )
  );
};

export default PaginationCmp;
