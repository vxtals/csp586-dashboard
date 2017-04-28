class App{
  static start(){
    Filter.getInstance();
    DatasetController.getInstance().init();
    FilterController.getInstance().init();
    ChartController.getInstance().init();

    FilterController.getInstance()
      .registerObserver(ChartController.getInstance());
  }
}
