import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _, { debounce } from "lodash";
import "./TableUser.scss";
import { CSVLink, CSVDownload } from "react-csv";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const [searchKeyWord, setSearchKeyWord] = useState("");

  const [dataExport, setDataExport] = useState([]);

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalConfirm(false);
  };

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleEditUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUser[index].first_name = user.first_name;
    setListUsers(cloneListUser);
  };

  const handleDeleteUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = cloneListUser.filter((item) => item.id !== user.id);
    setListUsers(cloneListUser);
  };

  useEffect(() => {
    //call apis
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);

    if (res && res.data) {
      setTotalUsers(res.total);
      setListUsers(res.data);
      setTotalPages(res.total_pages);
    }
  };

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };

  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };

  const handleDelele = (user) => {
    setIsShowModalConfirm(true);
    setDataUserDelete(user);
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    setListUsers(cloneListUser);
  };

  const handleSearch = debounce((event) => {
    let keyword = event.target.value;
    if (keyword) {
      console.log("search: ", event.target.value);
      let cloneListUser = _.cloneDeep(listUsers);
      cloneListUser = cloneListUser.filter((item) =>
        item.email.includes(keyword)
      );
      setListUsers(cloneListUser);
    } else {
      getUsers(1);
    }
  }, 500);

  const getUsersExport = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(["Id", "Email", "First Name", "Last Name"]);
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };

  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>List Users:</b>
        </span>
        <div className="group-btns">
          <div>
            <label htmlFor="import" className="btn btn-dark">
              <i className="fa-solid fa-file-import px-1"></i>
              <span className="px-1">Import</span>
            </label>
            <input id="import" type="file" hidden />
          </div>
          <CSVLink
            filename={"user_export.csv"}
            className="btn btn-success"
            data={dataExport}
            asyncOnClick={true}
            onClick={getUsersExport} // <=> onClick={(event, done) => getUsersExport(event, done)}  thư viện đã hỗ trợ
          >
            <i className="fa-solid fa-file-export px-1"></i>
            <span className="px-1">Export</span>
          </CSVLink>

          <button
            className="btn btn-primary"
            onClick={() => setIsShowModalAddNew(true)}
          >
            <i className="fa-solid fa-circle-plus px-1"></i>
            <span className="px-1">Add new</span>
          </button>
        </div>
      </div>

      <div className="col-4 my-3">
        <input
          className="form-control"
          placeholder="search user by email..."
          // value={searchKeyWord}
          onChange={(event) => handleSearch(event)}
        />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>
                <span>
                  {sortBy === "desc" ? (
                    <i
                      className="fa-solid fa-sort"
                      onClick={() => handleSort("asc", "id")}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-sort"
                      onClick={() => handleSort("desc", "id")}
                    ></i>
                  )}
                </span>
              </div>
            </th>
            <th>
              <div className="sort-header">
                <span>Email</span>
                <span>
                  {sortBy === "desc" ? (
                    <i
                      className="fa-solid fa-sort"
                      onClick={() => handleSort("asc", "email")}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-sort"
                      onClick={() => handleSort("desc", "email")}
                    ></i>
                  )}
                </span>
              </div>
            </th>
            <th>
              <div className="sort-header">
                <span>First Name</span>
                <span>
                  {sortBy === "desc" ? (
                    <i
                      className="fa-solid fa-sort"
                      onClick={() => handleSort("asc", "first_name")}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-sort"
                      onClick={() => handleSort("desc", "first_name")}
                    ></i>
                  )}
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => {
                        handleEditUser(item);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger mx-3"
                      onClick={() => {
                        handleDelele(item);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />

      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />

      <ModalEditUser
        show={isShowModalEdit}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handleEditUserFromModal={handleEditUserFromModal}
      />

      <ModalConfirm
        show={isShowModalConfirm}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
};

export default TableUsers;
