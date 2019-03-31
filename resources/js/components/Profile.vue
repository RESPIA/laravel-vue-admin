<template>
  <!-- Default box -->
  <div>
    <div class="col-md-12 mt-3">
      <div class="card card-widget widget-user">
        <!-- Add the bg color to the header using any of the bg-* classes -->
        <div class="widget-user-header bg-info-active">
          <h3 class="widget-user-username">Alexander Pierce</h3>
          <h5 class="widget-user-desc">Founder &amp; CEO</h5>
        </div>
        <div class="widget-user-image">
          <img class="img-circle elevation-2" :src="getProfilePhoto()" alt="User Avatar">
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col-sm-4 border-right">
              <div class="description-block">
                <h5 class="description-header">3,200</h5>
                <span class="description-text">SALES</span>
              </div>
              <!-- /.description-block -->
            </div>
            <!-- /.col -->
            <div class="col-sm-4 border-right">
              <div class="description-block">
                <h5 class="description-header">13,000</h5>
                <span class="description-text">FOLLOWERS</span>
              </div>
              <!-- /.description-block -->
            </div>
            <!-- /.col -->
            <div class="col-sm-4">
              <div class="description-block">
                <h5 class="description-header">35</h5>
                <span class="description-text">PRODUCTS</span>
              </div>
              <!-- /.description-block -->
            </div>
            <!-- /.col -->
          </div>
          <!-- /.row -->
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="card">
        <div class="card-header p-2">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a class="nav-link" href="#activity" data-toggle="tab">Activity</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active show" href="#settings" data-toggle="tab">Settings</a>
            </li>
          </ul>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <div class="tab-content">
            <!-- /.tab-pane -->
            <div class="tab-pane" id="activity">
              <!-- The timeline -->
              <!-- Post -->
              <div class="post">
                <div class="user-block">
                  <img
                    class="img-circle img-bordered-sm"
                    src="img/user1-128x128.jpg"
                    alt="user image"
                  >
                  <span class="username">
                    <a href="#">Jonathan Burke Jr.</a>
                    <a href="#" class="float-right btn-tool">
                      <i class="fa fa-times"></i>
                    </a>
                  </span>
                  <span class="description">Shared publicly - 7:30 PM today</span>
                </div>
                <!-- /.user-block -->
                <p>
                  Lorem ipsum represents a long-held tradition for designers,
                  typographers and the like. Some people hate it and argue for
                  its demise, but others ignore the hate as they create awesome
                  tools to help create filler text for everyone from bacon lovers
                  to Charlie Sheen fans.
                </p>

                <p>
                  <a href="#" class="link-black text-sm mr-2">
                    <i class="fa fa-share mr-1"></i> Share
                  </a>
                  <a href="#" class="link-black text-sm">
                    <i class="fa fa-thumbs-o-up mr-1"></i> Like
                  </a>
                  <span class="float-right">
                    <a href="#" class="link-black text-sm">
                      <i class="fa fa-comments-o mr-1"></i> Comments (5)
                    </a>
                  </span>
                </p>

                <input
                  class="form-control form-control-sm"
                  type="text"
                  placeholder="Type a comment"
                >
              </div>
              <!-- /.post -->
            </div>
            <!-- /.tab-pane -->

            <div class="tab-pane active show" id="settings">
              <form class="form-horizontal">
                <div class="form-group">
                  <label for="inputName" class="col-sm-2 control-label">Name</label>

                  <div class="col-sm-12">
                    <input
                      type
                      v-model="form.name"
                      class="form-control"
                      id="inputName"
                      placeholder="Name"
                      :class="{ 'is-invalid': form.errors.has('name') }"
                    >
                    <has-error :form="form" field="name"></has-error>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail" class="col-sm-2 control-label">Email</label>

                  <div class="col-sm-12">
                    <input
                      type="email"
                      v-model="form.email"
                      class="form-control"
                      id="inputEmail"
                      placeholder="Email"
                      :class="{ 'is-invalid': form.errors.has('email') }"
                    >
                    <has-error :form="form" field="email"></has-error>
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputExperience" class="col-sm-2 control-label">Experience</label>

                  <div class="col-sm-12">
                    <textarea
                      v-model="form.bio"
                      class="form-control"
                      id="inputExperience"
                      placeholder="Experience"
                      :class="{ 'is-invalid': form.errors.has('bio') }"
                    ></textarea>
                    <has-error :form="form" field="bio"></has-error>
                  </div>
                </div>
                <div class="form-group">
                  <label for="photo" class="col-sm-2 control-label">Profile Photo</label>
                  <div class="col-sm-12">
                    <input type="file" @change="updateProfile" name="photo" class="form-input">
                    <!-- <img :src="form.photo" alt width="80" height="80"> -->
                    <img :src="getProfilePhoto()" alt width="80" height="80">
                    <has-error :form="form" field="photo"></has-error>
                  </div>
                </div>

                <div class="form-group">
                  <label
                    for="password"
                    class="col-sm-12 control-label"
                  >Passport (if you dont change passport, defaule is old password)</label>

                  <div class="col-sm-12">
                    <input
                      type="password"
                      v-model="form.password"
                      class="form-control"
                      id="password"
                      placeholder="Passport"
                      :class="{ 'is-invalid': form.errors.has('password') }"
                    >
                    <has-error :form="form" field="password"></has-error>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-sm-offset-2 col-sm-12">
                    <button @click.prevent="updateInfo" type="submit" class="btn btn-success">Update</button>
                  </div>
                </div>
              </form>
            </div>
            <!-- /.tab-pane -->
          </div>
          <!-- /.tab-content -->
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.nav-tabs-custom -->
    </div>
  </div>
  <!-- /.card -->
</template>
<script>
export default {
  data() {
    return {
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
  mounted() {
    console.log("Component mounted.");
  },
  methods: {
    updateInfo() {
      this.$Progress.start();

      if (this.form.password == "") {
        this.form.password = undefined;
      }

      this.form
        .put("api/profile")
        .then(() => {
          // Update Profile Picture Instantly After Uploading
          Fire.$emit("AfterCrud");
          
          this.$Progress.finish();
        })
        .catch(() => {
          this.$Progress.fail();
        });
    },
    updateProfile(event) {
      let file = event.target.files[0];
      if (file.size > 1048576) {
        swal.fire({
          type: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: "<a href>Why do I have this issue?</a>"
        });
      } else {
        let reader = new FileReader();
        reader.onload = event => {
          this.form.photo = event.target.result;
          console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    // updateImage() {
    //   let img = this.form.photo;
    //   if (img.length > 100) {
    //     return this.form.photo;
    //   } else {
    //     return `./../img/profile/${this.form.photo}`;
    //   }
    // },
    getProfilePhoto() {
      let photo =
        this.form.photo.length > 200
          ? this.form.photo
          : "img/profile/" + this.form.photo;
      return photo;
    }
  },
  created() {
    axios.get("api/profile").then(({ data }) => this.form.fill(data));
  }
};
</script>
