<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'ctnas_wp' );

/** MySQL database username */
define( 'DB_USER', 'ctnas_wp' );

/** MySQL database password */
define( 'DB_PASSWORD', 'mMpKKZGUVhWj' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'F_;W0?N/e6eXq62Vm-Ov`|gF^jaziZObjXHxSb:=#KhPb+(FXdaz|<Us--^c2M#s');
define('SECURE_AUTH_KEY',  'YTA0W{[c_?[r&6@P4k]kzkg*RXv+69-J#V<hBCaRUj3zKR,yG% 3L#-q<A%}7;ao');
define('LOGGED_IN_KEY',    '_-tQInH-snm >jnes@xLL;GXI|ZN<Vcs[b?YU-0e=/N11F|G>.w-sY1B#-<m(q=^');
define('NONCE_KEY',        'hB*aXNpK0R/hs=A?-v&fcUbA}BYzk3U9}RhZ02) 6eVKoMUDgcX%r>^r2Dh3k(iJ');
define('AUTH_SALT',        'i#Fhszi+i+eE|sIQ6TL=bJCC.H&Y&#;RV?VCD|.+&+R~fbyy@#iVJ|P)Ypyn!m-/');
define('SECURE_AUTH_SALT', '(vRJ9GZ{[}0TcC7,9i*v,[:?TWx#}0Yw$I=;]eU|GW.Orzs7saPj]@hU ylA:YY}');
define('LOGGED_IN_SALT',   '9I#j~KQ9$EO]sJW3z(rrbF~6D7W#!FYP|`C+CLi}`v=KC|f V20eX8lUMPrY0+U-');
define('NONCE_SALT',       '{P0nt[5J5wk/D9kgY %]~cd;2-7K&BjW)O*!yST|fWF?||IzAQUf%tg7+50D.3Sd');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';




/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
