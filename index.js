const express = require("express"); //khai bao express
const bodyParser = require("body-parser"); //chuc nang parse request tu client sang server
const app = express();
const POST = 1233;

const users = [
  {
    id: 1,
    name: "Hoàng Văn Thìn",
    age: 48,
  },
  {
    id: 2,
    name: "Nguyễn Thị Tươi",
    age: 44,
  },
  {
    id: 3,
    name: "Hoàng Thị Phương Thanh",
    age: 24,
  },
  {
    id: 4,
    name: "Hoàng Đức Thuận",
    age: 18,
  },
  {
    id: 5,
    name: "Hoàng Thị Hồng Thơm",
    age: 14,
  },
  {
    id: 6,
    name: "Hoàng Xuân Thịnh",
    age: 10,
  },
];

var users1 = [
  {
    id: 1,
    name: "Hoàng Văn Thìn",
    age: 48,
  },
  {
    id: 2,
    name: "Nguyễn Thị Tươi",
    age: 44,
  },
  {
    id: 3,
    name: "Hoàng Thị Phương Thanh",
    age: 24,
  },
  {
    id: 4,
    name: "Hoàng Đức Thuận",
    age: 18,
  },
  {
    id: 5,
    name: "Hoàng Thị Hồng Thơm",
    age: 14,
  },
  {
    id: 6,
    name: "Hoàng Xuân Thịnh",
    age: 10,
  },
];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.listen(POST, () => {
  console.log(`Server is running on port :${POST}`);
});

app.get("/heheheheeh", (req, res) => {
  res.send("Welcome to the server ...");
  console.log("Hello World");
});

//Method Get : Api danh sách users
app.get("/users", (req, res) => {
  //Check các tham số(params) mà người dùng gửi qua bằng req.query
  const query = req.query;
  let data = users.filter((user) => user.name.includes(query.q || ""));
  console.log("✌️query --->", query);
  res.json({ data, total: users.length });
});

//Tạo api thêm mới user bằng cách
app.post("/users", (req, res) => {
  const body = req.body;
  console.log("✌️body --->", body);

  if (body?.name) {
    users.push({
      name: body.name,
      age: body.age,
      id: users.length + 1,
    });
  }
});

//Sửa cách khai báo biến users từ const qua var
app.put("/users/:id", (req, res) => {
  const body = req.body;
  console.log("✌️body --->", body);
  const params = req.params;
  console.log("✌️params --->", params);

  users1 = users1.map((x) => {
    if (x.id === Number(params.id)) {
      return { ...x, name: body.name || "" };
    }
    return x;
  });
  res.json({ data: users1 });
});

//Method delete thường dùng cho các api xóa thông tin, ví dụ: Xóa user, xóa tin tức...
app.delete("/users/:id", (req, res) => {
  const params = req.params;
  console.log("✌️params --->", params);

  users1 = users1.filter((user) => user.id !== Number(params.id));

  res.json({ data: users1 });
});
