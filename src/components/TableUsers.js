import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _ from "lodash";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});

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
    cloneListUser = cloneListUser.filter(item => item.id !== user.id);
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

  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>List Users:</b>
        </span>
        <button
          className="btn btn-success"
          onClick={() => setIsShowModalAddNew(true)}
        >
          Add new user
        </button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
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
