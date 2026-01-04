  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const data = await customFetch(
          "/products",
          "GET",
          null,
          undefined,
          undefined,
          true
        );

        const backendData = data.map((item) => ({
          id: item.id,
          titulo: item.name,
          descripcion: item.description,
          imagen: item.mainImage,
          precio: item.price,
          stock: item.stock,
          brand: item.brand,
          category: item.category,
          active: item.active,
        }));

        setPerfumes(backendData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfumes();
  }, []);