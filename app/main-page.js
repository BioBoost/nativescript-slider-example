const observableModule = require("tns-core-modules/data/observable");

const priorities = [
  "Low",
  "Normal",
  "High"
]

exports.onNavigatingTo = function(args) {
  const page = args.object;
  const context = new observableModule.fromObjectRecursive({
    project: {
      priority: {
        value: 1,
        label: priorities[1],
        MIN: 0,
        MAX: 2
      }
    }
  });

  // handle value change
  context.project.priority.on(observableModule.Observable.propertyChangeEvent, (propertyChangeData) => {
    if (propertyChangeData.propertyName === "value") {
      console.log("Value of UI slider changed");
      context.project.priority.set("label", priorities[propertyChangeData.value]);
    }
  });

  page.bindingContext = context;
}