export default async function LinksetDisplay({
    linksetData
}: {
    linksetData: Array<Array<string>>
}) {

    let linksetObjects: Array<React.ReactNode> = [];
  
    linksetData.map((linkset) => {
      if (linkset[5] == 'SK Materials') {
        linksetObjects.push(
          <a href={linkset[4]} className="mb-4" key={linkset[5]}>
            <span className="px-2 py-1 mr-2 group rounded-xl border bg-gradient-to-r from-pink-500/50 to-blue-500/75 transition-colors ease-in-out duration-300 hover:border-gray-300 hover:bg-blue-500/75" key={linkset[4]}>
            {linkset[5]}
            </span>
          </a>
          );
      } else {
        linksetObjects.push(
          <a href={linkset[4]} className="mb-4" key={linkset[5]}>
            <span className="px-2 py-1 mr-2 group rounded-xl border transition-colors transition-colors ease-in-out duration-300 hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-600" key={linkset[4]}>
            {linkset[5]}
            </span>
          </a>
          );
      }
    });

  return linksetObjects;
}
