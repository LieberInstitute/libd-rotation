import * as fs from 'fs/promises';
import fetch from 'node-fetch';
import * as path from 'path';

const dir = 'static';
const sample = 'Br6522_Ant_IF';

const s3_url = 'https://chaichontat-host.s3.amazonaws.com/libd-rotation';

const to_fetch = [
  'Astro',
  'Endo',
  'Excit',
  'Inhib',
  'Macrophage',
  'Micro',
  'Mural',
  'Neu',
  'OPC',
  'Oligo',
  'Tcell',
  'by_row',
  'coords',
  'OLIG2',
  'Oligo',
  'RBFOX3',
  'TMEM119'
];

const p = path.join(dir, sample);

async function run() {
  await fs.mkdir(p, { recursive: true });
  await Promise.all(
    to_fetch.map(async (name) => {
      const pa = path.join(p, `${name}.json`);
      try {
        await fs.access(pa);
      } catch (e) {
        await fetch(`${s3_url}/${sample}/${name}.json`)
          .then((r) => r.json())
          .then((j) => fs.writeFile(pa, JSON.stringify(j)));
      }
    })
  );
}

await run();
