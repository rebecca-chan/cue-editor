
console.log('is this working')






//ajx
const ajax = async () => {
  try {
    const result = await fetch('/api');
    const data = await result.json();
    console.log(data);
  }
  catch (error) {
    console.error(error);
  }
}

ajax();
