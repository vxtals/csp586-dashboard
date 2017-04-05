class ConfiguredChart extends BaseChart {
  constructor(ctx) {
    let chartLabels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
    let chartDatas = [12, 19, 3, 5, 2, 3];

    super({
      ctx,
      chartLabels,
      chartDatas
    });
  }
}
