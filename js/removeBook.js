export class RemoveBook{
    static id = 1;
    static bookname = "";
    static removeBook(element) {
        const firstElement = element.parentNode.firstElementChild;
        let id = firstElement.textContext;
        axios.delete(`http://localhost:8080/book/${id}`).then((result) => {
            console.log(result.data.msg);
        }).catch((err) => {
            console.log(err);
        });
    }

    static updateBook() {
        axios.put("http://localhost:8080/book",params={
            id:RemoveBook.id,
            bookname:"Java从入门到弃坑",
            bookauthor:"曹雪芹",
            bookprice:100.12
        }).then((result) => {
            console.log(result.data.data);
        }).catch((err) => {
            console.log(err);
        })
    }
}