class Book {
  title: string;
  author: string;
  isbn: string;
  constructor(title: string, author: string, isbn: string) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

const isbnNumbers = new Set();
const bookList: {
  sales: number;
  availability: boolean;
  isbn: string;
  title?: string | undefined;
  author?: string | undefined;
}[] = [];

const createBook = (title: string, author: string, isbn: string) => {
  const book = isbnNumbers.has(isbn);
  if (book) {
    return null;
  } else {
    const book = new Book(title, author, isbn);
    isbnNumbers.add(isbn);
    return book;
  }
};
const addBook = (
  title: string,
  author: string,
  isbn: string,
  availability: boolean,
  sales: number
) => {
  const book = {
    ...createBook(title, author, isbn),
    sales,
    availability,
    isbn,
  };

  bookList.push(book);
  return book;
};

addBook("Harry Potter", "JK Rowling", "AB123", false, 100);
addBook("Harry Potter", "JK Rowling", "AB123", true, 50);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", true, 10);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", false, 20);
addBook("The Great Gatsby", "F. Scott Fitzgerald", "EF567", false, 20);

console.log("Total amount of copies: ", bookList.length);
console.log("Total amount of books: ", isbnNumbers.size);
console.log(isbnNumbers.has("AB123"));
// console.log(isbnNumbers.add("AV123"));
// console.log(isbnNumbers.size);
