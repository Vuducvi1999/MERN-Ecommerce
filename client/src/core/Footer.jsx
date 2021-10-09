import React from "react";

function Footer() {
  return (
    <>
      <div className="container-fluid footer bg-dark text-light pt-3 mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <h4
                style={{
                  borderBottom: "1px solid #9999",
                  paddingBottom: "5px",
                  marginRight: "50%",
                }}
              >
                About Me
              </h4>
              <p className="dia-chi">
                Địa chỉ: Toà Nhà D06, Tầng 4, Phòng 02, Phường Đông Hòa , Thị Xã
                Dĩ An, Tỉnh Bình Dương.
              </p>
              <p className="so-dien-thoai">Số điện thoại: 0961122936</p>
              <p className="person-email">Email: vuducvi20@gmail.com</p>
              <p style={{ wordBreak: "break-all" }}>
                Facebook:&nbsp;
                <a
                  href="https://www.facebook.com/vuducvipandan"
                  target="_blank"
                >
                  https://www.facebook.com/vuducvipandan
                </a>
              </p>
            </div>
            <div className="col-md-4 col-sm-6">
              <h4
                style={{
                  borderBottom: "1px solid #9999",
                  paddingBottom: "5px",
                  marginRight: "50%",
                }}
              >
                Admin account
              </h4>
              <p>Email: vuducvi20@gmail.com</p>
              <p>Pasword: 1234</p>
            </div>
            <div className="col-md-4 col-sm-6">
              <h4
                style={{
                  borderBottom: "1px solid #9999",
                  paddingBottom: "5px",
                  marginRight: "20%",
                }}
              >
                About Ecommerce
              </h4>
              <p>Chức năng thanh toán chỉ có COD</p>
              <p>Sản phẩm ở New Arrival không đồng bộ với Best Sell</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-12 text-center py-2"
        style={{ backgroundColor: "#888" }}
      >
        2020 Person Project.
      </div>
    </>
  );
}

export default Footer;
