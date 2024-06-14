import React,{FC} from 'react';
import Sidebar from './Sidebar';

interface Registerprop {
    Name: string,
}


const Register: React.FC = () =>{
    return(

        <div className="container mt-4">
        <form 
        // onSubmit={this.handleSubmit} 
        className="border p-4">
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Email: </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                name="email"
                // value={email}
                // onChange={this.handleChange}
              />
             {/* {error && error.includes('email') && <div className="text-danger">{error}</div>} */}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Password:</label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                name="password"
                // value={password}
                // onChange={this.handleChange}
              />
              {/* {error && error.includes('password') && <div className="text-danger">{error}</div>}  */}
            </div>
          </div>
        
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <br />
          <br />
          {/* <Link to="/register">
            <button type="submit" class="btn btn-primary">
              Don't have account ? Register
            </button>
          </Link> */}
        </form>
      </div>
    )
}

export default Register