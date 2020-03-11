// Vue.component("task", {
//   props: {
//     tname: { type: String, default: "" },
//     tcompleted: { type: Boolean, default: false }
//   },
//   template: `
//           `,
//   methods: {
//     change() {
//       this.$emit("change");
//     },
//     del() {
//       this.$emit("del");
//     }
//   }
// });

var app = new Vue({
  el: "#app",
  data: {
    tasks: [{ name: "Tache 1", completed: false, editMode: false, editName: "" }],
    remainingTasks: 0,
    newTaskName: "",
    currentFilter: "all",
    editMode: false,
    allDone: false
  },
  methods: {
    store: function() {
      if (this.newTaskName !== "") {
        this.tasks.push({
          name: this.newTaskName,
          completed: false,
          editMode: false,
          editName: ""
        });
        this.newTaskName = "";
      }
    },
    changeTaskState: function(elem) {
      if (elem.completed) {
        elem.completed = false;
      } else {
        elem.completed = true;
      }
    },
    deleteTask: function(elem) {
      this.tasks.splice(this.tasks.indexOf(elem), 1);
    },
    clearAccomplished: function() {
      let i = 0;
      while (i < this.tasks.length) {
        if (this.tasks[i].completed) {
          this.tasks.splice(i, 1);
        } else {
          i++;
        }
      }
    },
    setAllAccomplished: function() {
      if (this.allDone === false) {
        this.tasks.forEach(elem => {
          elem.completed = true;
        });
      } else {
        this.tasks.forEach(elem => {
          elem.completed = false;
        });
      }
    },
    toggleEditMode: function(elem) {
      elem.editMode = true;
    },
    edit: function(elem) {
      elem.name = elem.editName;
      elem.editMode = false;
    },
    cancelEdit: function(elem) {
      elem.editName = elem.name;
      elem.editMode = false;
    }
  },

  computed: {
    computedRemaingTasks: function() {
      let sum = 0;
      this.tasks.forEach(element => {
        if (element.completed === false) {
          sum++;
        }
        if (sum === 0) {
          this.allDone = true;
        } else {
          this.allDone = false;
        }
      });
      return sum;
    },
    computedTasksDone: function() {
      let check = false;
      this.tasks.forEach(element => {
        if (element.completed === true) {
          check = true;
        }
      });
      return check;
    }
  }
});
