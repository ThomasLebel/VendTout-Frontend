const resizeImage = (
  image: HTMLImageElement,
  width: number,
  height: number,
  fill: boolean = true
) => {
  // Créer un canvas
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  // Définir les dimensions du canvas
  canvas.width = width;
  canvas.height = height;

  // Calculer le ratio de la largeur et de la hauteur
  const aspectRatio: number = image.width / image.height;
  let drawWidth: number;
  let drawHeight: number;

  // Déterminer les dimensions de dessin
  if (aspectRatio > 1) {
    drawWidth = width;
    drawHeight = width / aspectRatio;
  } else {
    drawHeight = height;
    drawWidth = height * aspectRatio;
  }

  // Ajuster les dimensions pour remplir le canvas

    if (drawWidth < width) {
      drawWidth = width;
      drawHeight = width / aspectRatio;
    } else {
      drawHeight = height;
      drawWidth = height * aspectRatio;
    }
  

  // Calculer les coordonnées pour center l'image
  const xOffset: number = (width - drawWidth) / 2;
  const yOffset: number = (height - drawHeight) / 2;

  // Dessiner l'image sur le canvas
  ctx?.drawImage(
    image,
    0,
    0,
    image.width,
    image.height,
    xOffset,
    yOffset,
    drawWidth,
    drawHeight
  );

  // Retourner l'URL de l'image redimensionnée
  return canvas;
};

export default resizeImage;
