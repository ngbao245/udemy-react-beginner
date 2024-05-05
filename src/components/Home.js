import React from "react";

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.frame}>
        <h6>
          Yêu cầu:
          <ul>
            <li>
              Sử dụng API từ trang web{" "}
              <a href="https://reqres.in/">https://reqres.in/</a> để tạo
              website.
            </li>
            <li>
              Sử dụng thư viện React để tạo một màn hình website cơ bản bao gồm
              các chức năng:
            </li>
            <ol>
              <li>Đăng nhập</li>
              <li>Thêm User</li>
              <li>Sửa User</li>
              <li>Xoá User</li>
              <li>Hiển thị tất cả các User</li>
              <li>Tìm kiếm User theo Id</li>
              <li>Sắp xếp theo FirstName</li>
              <li>Import User từ file .csv</li>
              <li>Export User ra file .csv</li>
            </ol>
            <li>
              Tự do tùy chỉnh html, css, để có một website nhẹ nhàng, khoa học
              và đẹp.
            </li>
            <li>Commit và đẩy source code lên github public.</li>
            <li>Triển khai website lên Heroku để demo.</li>
          </ul>
        </h6>

        <h6>
          Result:
          <ul>
            <li>Thời gian hoàn thành: 1-3 ngày</li>
            <li>Gửi link Heroku và Github link lại email này</li>
            <li>
              Thời gian phản hồi 2 ngày làm việc kể từ ngày nhận được bài thi.
            </li>
          </ul>
        </h6>

        <h6>
          Yêu cầu backend (optional - không bắt buộc):
          <ul>
            <li>
              Sử dụng Python Django Rest Framework, tạo các API như trên trang
              web: <a href="https://reqres.in/">https://reqres.in/</a>.
            </li>
          </ul>
        </h6>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    marginTop: "40px",
  },
  frame: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "750px",
    width: "100%",
  },
};

export default Home;
