export class HelpersService {
  localeCompare(a: string, b: string) {
    try {
      return( a.localeCompare( b, undefined, { numeric: true } ) );
    } catch (error) {
      console.warn( 'Extended localeCompare() not supported in this browser.' );
      return( a.localeCompare( b ) );
    }
  }
}
