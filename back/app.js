const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./db");

const PORT = 4000;
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.post("/test/seed/database", (req, res) => {
    const title = [
        "테스트1",
        "테스트2",
        "테스트3",
        "테스트4",
        "테스트5",

        "테스트6",
        "테스트7",
        "테스트8", 
        "테스트9",
        "테스트10",
    ];
    const content = [];
    const author = [
        "익명1",
        "익명2",
        "익명3",
        "익명4",
        "익명5",

        "익명6",
        "익명7",
        "익명8",
        "익명9",
        "익명10",
    ];
    const pass = [
        "1111",
        "2222",
        "3333",
        "4444",
        "5555",

        "6666",
        "7777",
        "8888",
        "9999",
        "1000",
    ];

    // 7번씩 넣기 
    //랜덤하게 데터 넣기

    for(let i=0; i < 7; i++) {
        const ran1 = Math.floor(Math.random() * title.length);
        const ran2 = Math.floor(Math.random() * author.length);
        const ran3 = Math.floor(Math.random() * pass.length);

        const _title = title[ran1];
        const _author = author[ran2];
        const _pass = pass[ran3];

        const insertQuery = `
            INSERT INTO board (title, content, author, pass, createdAt) VALUES
            ("${_title}", "SEED CONTENT", "${_author}", "${_pass}", now())
        `;
    
        db.query(insertQuery, (err, rows) => {
            if (err) {
                console.log(err);
            }

            console.log("database Create")
        });
    }

    return res.send("Create New Data")
});

// 1. 쿼리 작성
// 2. Network Protocal 작성
// 3. 프론트 개발

app.get("/api/list", (req, res) => {
    const selectQuery = `
    SELECT id,
           title,
           author,
           DATE_FORMAT(createdAt, "%Y.%m.%d") AS formatCreatedAt,
           content,
           createdAt,
           hit  
    FROM  board
    ORDER BY createdAt DESC
    `;

    db.query(selectQuery, (error, rows) => {
        if (error) {
            console.log(error);
        }

        return res.status(200).json(rows);
    });
}); 

app.post("/api/write", (req, res) => {
    const {title, author, pass, content} = req.body;

    const insertQuery = `
        INSERT  INTO    board (
            title,
            author,
            pass,
            content,
            createdAt
        ) VALUES (
            "${title}",
            "${author}",
            "${pass}",
            "${content}",
            now()
        )
    `;

    db.query(insertQuery, (error, result) => {
        if(error) {
            console.log(error);
            return;
        }

        return res.status(201).send("게시글에 등록성공")
    });
});

app.post("/api/delete", (req, res) => {
    const { selectId } = req.body;

    const deleteQuery = `
        DELETE  FROM board
         WHERE  id = ${selectId}
    `;

    db.query(deleteQuery, (error, result) => {
        if(error) {
            console.log(error);
            return;
        }

        return res.status(200).send("게시글 삭제성공")
    });
});

app.listen(PORT, () => {
    console.log(`${PORT} SERVER START`);
});