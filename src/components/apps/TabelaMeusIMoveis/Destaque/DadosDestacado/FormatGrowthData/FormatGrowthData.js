const rawData = [
    {
      id: "06b145b7-2862-4d6b-8dc0-d261705dd292",
      propertyId: "981e15c1-458b-4e9b-8f12-ea7a6fc8d220",
      userLatitude: "-7.8419897",
      userLongitude: "-35.7870716",
      createdAt: "2025-02-17T04:00:46.048Z",
      updatedAt: "2025-02-17T04:00:46.048Z"
    },
    {
      id: "some-id",
      propertyId: "another-property",
      userLatitude: "-8.123456",
      userLongitude: "-36.123456",
      createdAt: "2025-01-10T10:15:30.000Z",
      updatedAt: "2025-01-10T10:15:30.000Z"
    },
    // Adicione mais objetos para teste...
  ];
  
  const monthMap = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];
  
  // Inicializar o contador de visualizações por mês
  const monthlyCounts = Array(12).fill(0);
  
  rawData.forEach(item => {
    const monthIndex = new Date(item.createdAt).getMonth();
    monthlyCounts[monthIndex]++;
  });
  
  // Converter para o formato esperado
  const data = monthMap.map((month, index) => ({
    month,
    value: monthlyCounts[index]
  }));
  
  console.log(data);
  