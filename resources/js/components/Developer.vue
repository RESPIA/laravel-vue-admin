<template>
  <!-- Default box -->
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Developer</h3>

      <div class="card-tools">
        <button
          type="button"
          class="btn btn-tool"
          data-widget="collapse"
          data-toggle="tooltip"
          title="Collapse"
        >
          <i class="fa fa-minus"></i>
        </button>
        <button
          type="button"
          class="btn btn-tool"
          data-widget="remove"
          data-toggle="tooltip"
          title="Remove"
        >
          <i class="fa fa-times"></i>
        </button>
      </div>
    </div>
    <div class="card-body">
      <passport-clients></passport-clients>
      <passport-authorized-clients></passport-authorized-clients>
      <passport-personal-access-tokens></passport-personal-access-tokens>
    </div>
    <!-- /.card-body -->
    <div class="card-footer">Footer</div>
    <!-- /.card-footer-->
  </div>
  <!-- /.card -->
</template>
