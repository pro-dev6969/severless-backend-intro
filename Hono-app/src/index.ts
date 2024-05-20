import { Hono } from 'hono'

const app = new Hono()

async function authMdiddleware(c:any , next:any){

  if(c.req.header("Authorization"))
  {
    await next();
  }
  else
  {
    return c.text("You dont have access");
  }
}

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/user', authMdiddleware , async (c)=>{
  const body = await c.req.json()
  console.log(body);
  console.log(c.req.header('Authorization'));
  console.log(c.req.query('param'));
  
  return c.text('user req hit successsfully');
  
})

app.post('/object' , (c)=>{
  return c.json({
    message:'My first code in hono'
  })
})

export default app
