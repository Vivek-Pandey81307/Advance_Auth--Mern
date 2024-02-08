import './App.css';
import Header from './components/Header';
function App() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/Signup"element={<Signup/>}/>
          <Route path="/user" element={<Welcome/>} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
