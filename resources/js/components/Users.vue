<template>
  <div class="row">
    <div class="col-12" v-if="$gate.isAdmin()">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">List Users</h3>
          <div class="card-tools">
            <button
              type="button"
              class="btn btn-sm btn-success"
              data-toggle="modal"
              @click="newModel"
            >
              Add New
              <i class="fas fa-user-plus fa-fw"></i>
            </button>
          </div>
        </div>
        <!-- /.card-header -->
        <div class="card-body table-responsive p-0">
          <table class="table table-hover">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Register at</th>
                <th>Modify</th>
              </tr>
              <tr v-for="(user,index) in users.data" :key="user.id">
                <td>{{ index + 1 }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <span class="tag tag-success">{{ user.type | upText }}</span>
                </td>
                <td>{{ user.created_at | myDate }}</td>
                <td>
                  <a href="#" @click="editModel(user)">
                    <i class="fa fa-edit blue"></i>
                  </a>
                  &nbsp;
                  <a href="#" @click="deleteUser(user.id)">
                    <i class="fa fa-trash red"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          <pagination :data="users" @pagination-change-page="getResults"></pagination>
        </div>
      </div>
      <!-- /.card -->
    </div>

    <!-- Not found -->
    <div class="col-12">
      <not-found v-if="!$gate.isAdmin()"></not-found>
    </div>
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="UserForm"
      tabindex="-1"
      role="dialog"
      aria-labelledby="UserFormLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="addNewUserLabel"
            >{{ editmode == true ? "Edit User" : "Create User" }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="editmode ? updateUser() : createUser()">
            <div class="modal-body">
              <div class="form-group">
                <input
                  placeholder="Name..."
                  v-model="form.name"
                  type="text"
                  name="name"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('name') }"
                >
                <has-error :form="form" field="name"></has-error>
              </div>

              <div class="form-group">
                <input
                  placeholder="Email..."
                  v-model="form.email"
                  type="email"
                  name="email"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                >
                <has-error :form="form" field="email"></has-error>
              </div>

              <div class="form-group">
                <textarea
                  v-model="form.bio"
                  name="bio"
                  id="bio"
                  placeholder="Short bio for user (Optional)"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('bio') }"
                ></textarea>
                <has-error :form="form" field="bio"></has-error>
              </div>

              <div class="form-group">
                <select
                  name="type"
                  v-model="form.type"
                  id="type"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('type') }"
                >
                  <option value>Select User Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">Standard User</option>
                  <option value="author">Author</option>
                </select>
                <has-error :form="form" field="type"></has-error>
              </div>

              <div class="form-group">
                <input
                  placeholder="Password"
                  v-model="form.password"
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                >
                <has-error :form="form" field="password"></has-error>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button v-show="editmode" type="submit" class="btn btn-primary">Update</button>
              <button v-show="!editmode" type="submit" class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // check edit or created
      editmode: false,
      // loadUsers
      users: {},
      form: new Form({
        id: "",
        name: "",
        email: "",
        password: "",
        type: "",
        bio: "",
        photo: ""
      })
    };
  },
  methods: {
    getResults(page = 1) {
			axios.get('api/user?page=' + page)
				.then(response => {
					this.users = response.data;
				});
		},
    // task update data
    updateUser() {
      this.$Progress.start();
      //console.log('edit data');
      if (this.$gate.isAdmin()) {
        this.form
          .put("/api/user/" + this.form.id)
          .then(response => {
            console.log(response.data.user);
            // #task1 Load data vie $emit (tigger) AfterCrud vie Window.Fire from app.js
            Fire.$emit("AfterCrud");

            // hide mode after created user
            $("#UserForm").modal("hide");
            // show message updated
            toast.fire({
              type: "success",
              title: "User updated successfully"
            });
          })
          .catch(() => {
            this.$Progress.fail();
          });
      }
      this.$Progress.finish();
    },
    // fild data to form edit
    editModel(user) {
      this.editmode = true;
      // v-form method
      this.form.reset();
      $("#UserForm").modal("show");
      // fild data
      this.form.fill(user);
    },
    newModel() {
      // v-form method
      this.editmode = false;
      this.form.reset();
      $("#UserForm").modal("show");
    },
    // created user
    createUser() {
      console.log("new data");
      this.$Progress.start();
      this.form
        .post("/api/user")
        .then(response => {
          console.log(response.data);
          this.$router.push("/users");

          // #task1 Load data vie $emit (tigger) AfterCrud vie Window.Fire from app.js
          Fire.$emit("AfterCrud");

          // hide mode after created user
          $("#UserForm").modal("hide");

          toast.fire({
            type: "success",
            title: "User Create successfully"
          });
        })
        .catch(e => {
          console.log(e.response.data);
        });

      this.$Progress.finish();
    },
    // load users
    loadUsers() {
      /*
      Check isadmin for load user
      And fix errors Failed to load resource: the server responded with a status of 403 (Forbidden)
      Uncaught (in promise) Error: Request failed with status code 403
      */
      if (this.$gate.isAdmin()) {
        axios.get("/api/user").then(({ data }) => (this.users = data));

        
        // before pagination
        // axios.get("/api/user").then(({ data }) => (this.users = data.data));
      }
      //axios.get("/api/user").then(({ data }) => (this.users = data.data));
    },
    // delete user
    deleteUser(id) {
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to delete this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            //console.log(id);
            this.$Progress.start();
            axios
              .delete("/api/user/" + id)
              .then(response => {
                console.log(response.data.user);
                //#task1 Load data vie $emit (tigger) AfterCrud vie Window.Fire from app.js
                Fire.$emit("AfterCrud");
              })
              .catch(e => {
                console.log(e.response.data);
                swal.fire("Failed!", "There was something wronge.", "warning");
              });
            this.$Progress.finish();
            swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
    }
  },
  created() {
    // Search via $emit from app.js
    Fire.$on('searching',()=>{
      // get search from app.js in data obj via $parent
      let query = this.$parent.search;
      axios.get('api/findUser?q=' + query)
      .then((data)=>{
          this.users = data.data;
      })
      .catch(()=>{

      })
    });

    // load User
    this.loadUsers();
    
    // run #task1 setInterval(() => this.loadUsers(), 3000);
    Fire.$on("AfterCrud", () => {
      this.loadUsers();
    });
  }
};
</script>



