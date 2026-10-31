let book =[
    {bookCode:"BOK-001",
    title:"Lập Trình Căn Bản",
    author:"Nguyễn Hữu Tài",
    publishYear:2018,
    quantity:12},
    {bookCode:"BOK-002",
    title:"Cấu Trúc Dữ Liệu",
    author:"Trần Minh Đức",
    publishYear:2020,
    quantity:8},
    {bookCode:"BOK-003",
    title:"Thiết Kế Wed Hiện Đại",
    author:"Nguyễn Hữu Tài",
    publishYear:2023,
    quantity:15}
]
let print_list_Book = ()=>{
    if (book.length ===0){
        console.log("Danh sách rỗng")
    }else{
    for(let i = 0; i < book.length; i++){
        console.log(`${i + 1}.${book[i].bookCode}-${book[i].title}-${book[i].author}
    Năm xuất bản:${book[i].publishYear}|Số lượng:${book[i].quantity}`)
    }
    console.log(`Tổng:${book.length} đầu sách`)
    }
}

let format_book = (bookItem, index)=>{
    console.log(`${index + 1}.${bookItem.bookCode}-${bookItem.title}-${bookItem.author}
    Năm xuất bản:${bookItem.publishYear}|Số lượng:${bookItem.quantity}`)
}

let normalize_name = (value)=>{
    return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("vi-VN")
        .replace(/(^|\s)\S/gu, (letter)=>letter.toLocaleUpperCase("vi-VN"))
}
let prompt_integer = (message, min, max)=>{
    while(true){
        let value = prompt(message)
        if(value === null){
            return null
        }
        value = value.trim()
        if(/^\d+$/.test(value)){
            let number = Number(value)
            if(number >= min && number <= max){
                return number
            }
        }
        console.log(`Giá trị không hợp lệ. Vui lòng nhập số từ ${min} đến ${max}.`)
    }
}

let add_newBook =()=>{
    let bookCode = prompt("Nhập mã sách:")
    if(bookCode === null){
        console.log("Đã hủy thao tác")
        return
    }
    bookCode = bookCode.trim()
    if(bookCode.length < 6 || !bookCode.startsWith("BOK-") ||
        /\s/.test(bookCode) || book.some((item)=>item.bookCode === bookCode)){
        console.log("Mã sách không hợp lệ hoặc đã tồn tại")
        return
    }

    let title
    while(true){
        let value = prompt("Nhập tên sách:")
        if(value === null){
            console.log("Đã hủy thao tác")
            return
        }
        if(value.trim()){
            title = normalize_name(value)
            break
        }
        console.log("Tên sách không được để trống")
    }

    let author
    while(true){
        let value = prompt("Nhập tên tác giả:")
        if(value === null){
            console.log("Đã hủy thao tác")
            return
        }
        if(value.trim()){
            author = normalize_name(value)
            break
        }
        console.log("Tên tác giả không được để trống")
    }

    let publishYear = prompt_integer("Nhập năm xuất bản (1990-2026):", 1990, 2026)
    if(publishYear === null){
        console.log("Đã hủy thao tác")
        return
    }
    let quantity = prompt_integer("Nhập số lượng (1-50):", 1, 50)
    if(quantity === null){
        console.log("Đã hủy thao tác")
        return
    }

    let newBook = {bookCode, title, author, publishYear, quantity}
    book.push(newBook)
    console.log("Đã thêm đầu sách:")
    format_book(newBook, book.length - 1)
}

let update_Book =()=>{
    let bookCode = prompt("Nhập mã sách cần cập nhật:")
    if(bookCode === null){
        console.log("Đã hủy thao tác")
        return
    }
    let bookItem = book.find((item)=>item.bookCode === bookCode.trim())
    if(!bookItem){
        console.log("Không thấy sách")
        return
    }

    let publishYear = prompt_integer("Nhập năm xuất bản mới (1990-2026):", 1990, 2026)
    if(publishYear === null){
        console.log("Đã hủy thao tác")
        return
    }
    let quantity = prompt_integer("Nhập số lượng mới (1-50):", 1, 50)
    if(quantity === null){
        console.log("Đã hủy thao tác")
        return
    }

    let previousYear = bookItem.publishYear
    let previousQuantity = bookItem.quantity
    bookItem.publishYear = publishYear
    bookItem.quantity = quantity
    console.log(`Năm xuất bản: ${previousYear} -> ${publishYear}`)
    console.log(`Số lượng: ${previousQuantity} -> ${quantity}`)
}

let delete_book =() =>{
    let bookCode = prompt("Nhập mã sách cần xóa:")
    if(bookCode === null){
        console.log("Đã hủy thao tác")
        return
    }
    let index = book.findIndex((item)=>item.bookCode === bookCode.trim())
    if(index === -1){
        console.log("Không thấy sách")
        return
    }
    let confirmation = prompt(`Xác nhận xóa sách ${book[index].title}? Nhập Y để xác nhận:`)
    if(confirmation !== "Y" && confirmation !== "y"){
        console.log("Đã hủy thao tác")
        return
    }
    book.splice(index, 1)
    console.log(`Đã xóa sách. Còn lại ${book.length} đầu sách`)
}

let find_authorBook =()=>{
    let keyword = prompt("Nhập từ khóa tìm kiếm theo tác giả:")
    if(keyword === null || !keyword.trim()){
        console.log("Chưa nhập từ khóa tìm kiếm")
        return
    }
    let searchTerm = keyword.trim().toLocaleLowerCase("vi-VN")
    let matchedBooks = book.filter((item)=>
        item.author.toLocaleLowerCase("vi-VN").includes(searchTerm))
    if(matchedBooks.length === 0){
        console.log("Không thấy đầu sách phù hợp")
        return
    }
    matchedBooks.forEach((item)=>format_book(item, book.indexOf(item)))
}

let menu =(
) =>{
    let input =-1
do{
    let menu_Lib =prompt(`
=======================================================
HỆ THỐNG QUẢN LÝ ĐẦU SÁCH THƯ VIỆN BÌNH MINH
=======================================================
1.Hiển thị danh sách đầu sách
2.Thên đầu sách mới
3.Cập nhập thông tinh đầu sách
4.Xóa đầu sách
5.Tìm kiếm đầu sách theo tác giả
0.Thoát chương trình
=======================================================
Vui lòng nhập lựa chọn của bạn(0-5):
    `)
    if(menu_Lib === null){
        input = 0
        continue
    }
    input = Number(menu_Lib)
    if(!Number.isInteger(input) || input < 0 || input > 5){
        console.log("Lựa chọn không hợp lệ")
        continue
    }
switch(input){
    case 1:
        print_list_Book()
        break;
    case 2:
        add_newBook()
        break;
    case 3:
        update_Book()
        break;
    case 4:
        delete_book()
        break;
    case 5:
        find_authorBook()
        break;
    case 0:
        console.log("Xin chào tạm biệt")
        break
    default:
        console.log("Lựa chọn không hợp lệ")
}

}while(input !=0) 
}


menu()