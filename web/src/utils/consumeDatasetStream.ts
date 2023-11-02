export function parseNDJSON() {
  let ndjsonBuffer = '';

  return new TransformStream({
    transform(chunk, controller) {
      ndjsonBuffer += chunk;

      const items = ndjsonBuffer.split('\n');
      items
        .slice(0, -1)
        .forEach((item) => controller.enqueue(JSON.parse(item)));

      ndjsonBuffer = items[items.length - 1];
    },
    flush(controller) {
      if (!ndjsonBuffer) return;
      controller.enqueue(JSON.parse(ndjsonBuffer));
    },
  });
}

export async function consumeDataset(url: string, signal: AbortSignal) {
  const response = await fetch(url, {
    signal,
  });
  if (!response.body) return;

  const reader = response.body
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(parseNDJSON());

  return reader;
}

export async function startConsume(
  url: string,
  signal: AbortSignal,
  updateStateCallback: Function
) {
  try {
    const readable = await consumeDataset(url, signal);
    await readable?.pipeTo(updateStateCallback(), { signal: signal });
  } catch (error: any) {
    if (!error.message.includes('abort')) throw error;
  }
}
