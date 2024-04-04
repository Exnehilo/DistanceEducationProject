export const isYouTubeLink = (link) => {
	const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/;
	return youtubeRegex.test(link);
};
