<?php
/**
 * Plugin Name: Laforet Designer — Paramètres du site
 * Description: Gestion centralisée des textes, du formulaire de contact et des intégrations.
 * Version: 1.1
 * Author: Laforet Designer
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// ─── CORS pour le site React ──────────────────────────────────────────────────
add_action( 'rest_api_init', function () {
    remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
    add_filter( 'rest_pre_serve_request', function ( $value ) {
        $allowed = [ 'https://laforetdesigner.com', 'https://www.laforetdesigner.com', 'http://localhost:5173' ];
        $origin  = $_SERVER['HTTP_ORIGIN'] ?? '';
        if ( in_array( $origin, $allowed, true ) || empty( $origin ) ) {
            header( 'Access-Control-Allow-Origin: ' . ( $origin ?: '*' ) );
        }
        header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
        header( 'Access-Control-Allow-Headers: Content-Type, Authorization' );
        header( 'Access-Control-Allow-Credentials: true' );
        return $value;
    } );
}, 15 );

// ─── Helpers ──────────────────────────────────────────────────────────────────

function laforet_initials( $name ) {
    $parts = array_values( array_filter( explode( ' ', trim( $name ) ) ) );
    $i     = strtoupper( substr( $parts[0] ?? 'X', 0, 1 ) );
    if ( count( $parts ) > 1 ) $i .= strtoupper( substr( end( $parts ), 0, 1 ) );
    return $i;
}

function laforet_defaults() {
    return [
        // Hero
        'laforet_hero_label'         => 'Agence de design créatif — Paris',
        'laforet_hero_title1'        => 'Laforet',
        'laforet_hero_title2'        => 'Designer.',
        'laforet_hero_description'   => "Nous façonnons des identités visuelles, communications globales et expériences digitales pour les marques qui veulent s'imposer.",
        'laforet_hero_cta_primary'   => 'Démarrer un projet',
        'laforet_hero_cta_secondary' => 'Voir les réalisations',
        // Stats
        'laforet_stat1_value'  => '5',   'laforet_stat1_suffix' => '/5',   'laforet_stat1_label' => 'Satisfaction client',
        'laforet_stat2_value'  => '100', 'laforet_stat2_suffix' => '+',    'laforet_stat2_label' => 'Projets réalisés',
        'laforet_stat3_value'  => '12',  'laforet_stat3_suffix' => ' ans', 'laforet_stat3_label' => "D'expérience",
        'laforet_stat4_value'  => '800', 'laforet_stat4_suffix' => 'h+',   'laforet_stat4_label' => 'De création',
        // Clients
        'laforet_clients' => 'Airpeak, Nordica, Maison Leroy, Atlas Studio, Green Pulse, Nexus, Volta, Lumiera, Meridian, Solaris, Forma, Kento',
        // Témoignages
        'laforet_testi1_name'    => 'Sophie Marchand',
        'laforet_testi1_role'    => 'CEO',
        'laforet_testi1_company' => 'Airpeak Technologies',
        'laforet_testi1_text'    => "Laforet Designer a transformé notre image de marque. L'équipe a saisi l'essence de notre vision et l'a traduite en une identité visuelle percutante. Nos prospects nous reconnaissent immédiatement.",
        'laforet_testi2_name'    => 'Thomas Renard',
        'laforet_testi2_role'    => 'Directeur Marketing',
        'laforet_testi2_company' => 'Maison Leroy',
        'laforet_testi2_text'    => "Un travail exceptionnel sur notre campagne. Créativité, rigueur et réactivité : Laforet incarne les valeurs que nous cherchions pour notre marque premium. Résultats au-delà de nos attentes.",
        'laforet_testi3_name'    => 'Camille Dufort',
        'laforet_testi3_role'    => 'Fondatrice',
        'laforet_testi3_company' => 'Nordica Foods',
        'laforet_testi3_text'    => "Notre identité de marque est maintenant à la hauteur de notre ambition. Laforet a créé quelque chose d'intemporel. Le packaging nous ouvre des portes que nous n'aurions pas pu franchir seuls.",
        // Coordonnées
        'laforet_contact_email'   => 'hello@laforetdesigner.com',
        'laforet_contact_phone'   => '+33 1 23 45 67 89',
        'laforet_contact_address' => 'Paris, France',
        // Réseaux sociaux
        'laforet_social_behance'  => '#',
        'laforet_social_linkedin' => '#',
        'laforet_social_youtube'  => '#',
        // Footer
        'laforet_footer_tagline' => 'Agence de design créatif. Branding, communication 360 et solutions digitales pour les marques ambitieuses.',
        // ── Notifications formulaire ──────────────────────────────────────────
        'laforet_notif_email'    => get_option( 'admin_email' ),  // email de réception
        // ── Notion (optionnel) ────────────────────────────────────────────────
        'laforet_notion_key'     => '',
        'laforet_notion_db'      => '',
    ];
}

function laforet_textarea_fields() {
    return [
        'laforet_hero_description',
        'laforet_testi1_text', 'laforet_testi2_text', 'laforet_testi3_text',
        'laforet_clients', 'laforet_footer_tagline',
    ];
}

// ─── Enregistrement settings ──────────────────────────────────────────────────

add_action( 'admin_init', function () {
    $textarea = laforet_textarea_fields();
    foreach ( laforet_defaults() as $key => $default ) {
        register_setting( 'laforet_settings_group', $key, [
            'sanitize_callback' => in_array( $key, $textarea )
                ? 'sanitize_textarea_field'
                : 'sanitize_text_field',
        ] );
    }
} );

// ─── Menu admin ───────────────────────────────────────────────────────────────

add_action( 'admin_menu', function () {
    add_menu_page(
        'Paramètres du site',
        '⚙️ Paramètres site',
        'manage_options',
        'laforet-settings',
        'laforet_render_settings_page',
        'dashicons-admin-customizer',
        4
    );
    add_submenu_page(
        'laforet-settings',
        'Contacts reçus',
        '📋 Contacts reçus',
        'manage_options',
        'laforet-contacts',
        'laforet_render_contacts_page'
    );
} );

// ─── Page des contacts reçus ──────────────────────────────────────────────────

function laforet_render_contacts_page() {
    $contacts = get_option( 'laforet_contacts', [] );
    $contacts = array_reverse( $contacts ); // plus récent en premier
    ?>
    <div class="wrap">
        <h1>📋 Contacts reçus (<?= count( $contacts ) ?>)</h1>
        <?php if ( empty( $contacts ) ) : ?>
            <p style="color:#888;">Aucun contact reçu pour l'instant.</p>
        <?php else : ?>
            <table class="widefat striped" style="margin-top:16px;">
                <thead>
                    <tr>
                        <th>Date</th><th>Nom</th><th>Email</th><th>Entreprise</th>
                        <th>Type</th><th>Budget</th><th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ( $contacts as $c ) : ?>
                    <tr>
                        <td style="white-space:nowrap;"><?= esc_html( $c['date'] ?? '' ) ?></td>
                        <td><strong><?= esc_html( $c['name'] ?? '' ) ?></strong></td>
                        <td><a href="mailto:<?= esc_attr( $c['email'] ?? '' ) ?>"><?= esc_html( $c['email'] ?? '' ) ?></a></td>
                        <td><?= esc_html( $c['company'] ?? '—' ) ?></td>
                        <td><?= esc_html( $c['projectType'] ?? '—' ) ?></td>
                        <td><?= esc_html( $c['budget'] ?? '—' ) ?></td>
                        <td style="max-width:300px;"><?= esc_html( substr( $c['message'] ?? '', 0, 120 ) ) ?>…</td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
    <?php
}

// ─── Page de paramètres ───────────────────────────────────────────────────────

function laforet_render_settings_page() {
    if ( ! current_user_can( 'manage_options' ) ) return;

    $defaults  = laforet_defaults();
    $textareas = laforet_textarea_fields();

    $sections = [
        '🖥️ Section Hero' => [
            'laforet_hero_label'         => 'Label (ex : "Agence de design créatif — Paris")',
            'laforet_hero_title1'        => 'Titre ligne 1',
            'laforet_hero_title2'        => 'Titre ligne 2 (en bleu)',
            'laforet_hero_description'   => 'Description',
            'laforet_hero_cta_primary'   => 'Bouton principal',
            'laforet_hero_cta_secondary' => 'Bouton secondaire',
        ],
        '📊 Statistiques' => [
            'laforet_stat1_value' => 'Stat 1 — Nombre', 'laforet_stat1_suffix' => 'Stat 1 — Suffixe', 'laforet_stat1_label' => 'Stat 1 — Label',
            'laforet_stat2_value' => 'Stat 2 — Nombre', 'laforet_stat2_suffix' => 'Stat 2 — Suffixe', 'laforet_stat2_label' => 'Stat 2 — Label',
            'laforet_stat3_value' => 'Stat 3 — Nombre', 'laforet_stat3_suffix' => 'Stat 3 — Suffixe', 'laforet_stat3_label' => 'Stat 3 — Label',
            'laforet_stat4_value' => 'Stat 4 — Nombre', 'laforet_stat4_suffix' => 'Stat 4 — Suffixe', 'laforet_stat4_label' => 'Stat 4 — Label',
        ],
        '🏢 Clients (bandeau défilant)' => [
            'laforet_clients' => 'Noms séparés par des virgules',
        ],
        '💬 Témoignage 1' => [
            'laforet_testi1_name' => 'Nom', 'laforet_testi1_role' => 'Poste',
            'laforet_testi1_company' => 'Entreprise', 'laforet_testi1_text' => 'Texte',
        ],
        '💬 Témoignage 2' => [
            'laforet_testi2_name' => 'Nom', 'laforet_testi2_role' => 'Poste',
            'laforet_testi2_company' => 'Entreprise', 'laforet_testi2_text' => 'Texte',
        ],
        '💬 Témoignage 3' => [
            'laforet_testi3_name' => 'Nom', 'laforet_testi3_role' => 'Poste',
            'laforet_testi3_company' => 'Entreprise', 'laforet_testi3_text' => 'Texte',
        ],
        '📞 Coordonnées' => [
            'laforet_contact_email'   => 'Email affiché sur le site',
            'laforet_contact_phone'   => 'Téléphone affiché',
            'laforet_contact_address' => 'Adresse affichée',
        ],
        '🔗 Réseaux sociaux' => [
            'laforet_social_behance'  => 'URL Behance',
            'laforet_social_linkedin' => 'URL LinkedIn',
            'laforet_social_youtube'  => 'URL YouTube',
        ],
        '🦶 Footer' => [
            'laforet_footer_tagline' => 'Tagline',
        ],
        '📬 Notifications formulaire de contact' => [
            'laforet_notif_email' => 'Email qui reçoit les notifications (votre Gmail)',
        ],
        '🗂️ Notion (optionnel — pour tableur des contacts)' => [
            'laforet_notion_key' => 'Clé API Notion (secret_xxxxx)',
            'laforet_notion_db'  => 'ID de la base de données Notion',
        ],
    ];
    ?>
    <div class="wrap">
        <h1>⚙️ Paramètres du site — Laforet Designer</h1>
        <p style="color:#666;margin-bottom:24px;">Modifiez ici tous les textes et paramètres. Enregistrez pour mettre à jour le site instantanément.</p>
        <?php settings_errors( 'laforet_settings_group' ); ?>
        <form method="post" action="options.php">
            <?php settings_fields( 'laforet_settings_group' ); ?>
            <?php foreach ( $sections as $section_title => $fields ) : ?>
                <h2 style="background:#1E40AF;color:#fff;padding:10px 16px;border-radius:4px;font-size:14px;margin-top:24px;">
                    <?= esc_html( $section_title ) ?>
                </h2>
                <table class="form-table">
                    <?php foreach ( $fields as $key => $label ) :
                        $val = get_option( $key, $defaults[ $key ] ?? '' );
                        $is_textarea = in_array( $key, $textareas );
                        $is_secret   = in_array( $key, [ 'laforet_notion_key' ] );
                    ?>
                    <tr>
                        <th scope="row" style="width:260px;">
                            <label for="<?= esc_attr( $key ) ?>"><?= esc_html( $label ) ?></label>
                        </th>
                        <td>
                            <?php if ( $is_textarea ) : ?>
                                <textarea name="<?= esc_attr( $key ) ?>" id="<?= esc_attr( $key ) ?>" rows="3" class="large-text"><?= esc_textarea( $val ) ?></textarea>
                            <?php elseif ( $is_secret ) : ?>
                                <input type="password" name="<?= esc_attr( $key ) ?>" id="<?= esc_attr( $key ) ?>" value="<?= esc_attr( $val ) ?>" class="regular-text" autocomplete="off" />
                            <?php else : ?>
                                <input type="text" name="<?= esc_attr( $key ) ?>" id="<?= esc_attr( $key ) ?>" value="<?= esc_attr( $val ) ?>" class="regular-text" />
                            <?php endif; ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </table>
            <?php endforeach; ?>
            <?php submit_button( '💾 Enregistrer les paramètres' ); ?>
        </form>
    </div>
    <?php
}

// ─── REST API — Paramètres du site ────────────────────────────────────────────

add_action( 'rest_api_init', function () {
    register_rest_route( 'site/v1', '/settings', [
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => 'laforet_api_settings',
        'permission_callback' => '__return_true',
    ] );

    register_rest_route( 'site/v1', '/contact', [
        'methods'             => 'POST, OPTIONS',
        'callback'            => 'laforet_api_contact',
        'permission_callback' => '__return_true',
    ] );
} );

function laforet_api_settings() {
    $d = laforet_defaults();
    $g = fn( $key ) => get_option( $key, $d[ $key ] ?? '' );

    return rest_ensure_response( [
        'hero' => [
            'label'         => $g( 'laforet_hero_label' ),
            'title1'        => $g( 'laforet_hero_title1' ),
            'title2'        => $g( 'laforet_hero_title2' ),
            'description'   => $g( 'laforet_hero_description' ),
            'cta_primary'   => $g( 'laforet_hero_cta_primary' ),
            'cta_secondary' => $g( 'laforet_hero_cta_secondary' ),
        ],
        'stats' => [
            [ 'value' => (int) $g( 'laforet_stat1_value' ), 'suffix' => $g( 'laforet_stat1_suffix' ), 'label' => $g( 'laforet_stat1_label' ) ],
            [ 'value' => (int) $g( 'laforet_stat2_value' ), 'suffix' => $g( 'laforet_stat2_suffix' ), 'label' => $g( 'laforet_stat2_label' ) ],
            [ 'value' => (int) $g( 'laforet_stat3_value' ), 'suffix' => $g( 'laforet_stat3_suffix' ), 'label' => $g( 'laforet_stat3_label' ) ],
            [ 'value' => (int) $g( 'laforet_stat4_value' ), 'suffix' => $g( 'laforet_stat4_suffix' ), 'label' => $g( 'laforet_stat4_label' ) ],
        ],
        'clients'      => array_values( array_filter( array_map( 'trim', explode( ',', $g( 'laforet_clients' ) ) ) ) ),
        'testimonials' => [
            [ 'id' => 1, 'name' => $g( 'laforet_testi1_name' ), 'role' => $g( 'laforet_testi1_role' ), 'company' => $g( 'laforet_testi1_company' ), 'text' => $g( 'laforet_testi1_text' ), 'initials' => laforet_initials( $g( 'laforet_testi1_name' ) ) ],
            [ 'id' => 2, 'name' => $g( 'laforet_testi2_name' ), 'role' => $g( 'laforet_testi2_role' ), 'company' => $g( 'laforet_testi2_company' ), 'text' => $g( 'laforet_testi2_text' ), 'initials' => laforet_initials( $g( 'laforet_testi2_name' ) ) ],
            [ 'id' => 3, 'name' => $g( 'laforet_testi3_name' ), 'role' => $g( 'laforet_testi3_role' ), 'company' => $g( 'laforet_testi3_company' ), 'text' => $g( 'laforet_testi3_text' ), 'initials' => laforet_initials( $g( 'laforet_testi3_name' ) ) ],
        ],
        'contact' => [
            'email'   => $g( 'laforet_contact_email' ),
            'phone'   => $g( 'laforet_contact_phone' ),
            'address' => $g( 'laforet_contact_address' ),
        ],
        'social' => [
            'behance'  => $g( 'laforet_social_behance' ),
            'linkedin' => $g( 'laforet_social_linkedin' ),
            'youtube'  => $g( 'laforet_social_youtube' ),
        ],
        'footer' => [ 'tagline' => $g( 'laforet_footer_tagline' ) ],
    ] );
}

// ─── REST API — Formulaire de contact ────────────────────────────────────────

function laforet_api_contact( WP_REST_Request $request ) {
    // Preflight OPTIONS
    if ( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
        return new WP_REST_Response( null, 200 );
    }

    $data = $request->get_json_params();

    $name        = sanitize_text_field( $data['name']        ?? '' );
    $email       = sanitize_email(      $data['email']       ?? '' );
    $company     = sanitize_text_field( $data['company']     ?? '' );
    $phone       = sanitize_text_field( $data['phone']       ?? '' );
    $projectType = sanitize_text_field( $data['projectType'] ?? '' );
    $budget      = sanitize_text_field( $data['budget']      ?? '' );
    $deadline    = sanitize_text_field( $data['deadline']    ?? '' );
    $message     = sanitize_textarea_field( $data['message'] ?? '' );

    if ( empty( $name ) || ! is_email( $email ) || empty( $message ) ) {
        return new WP_REST_Response( [ 'error' => 'Champs requis manquants.' ], 400 );
    }

    $project_labels = [
        'branding'             => 'Branding',
        'com-360'              => 'COM 360',
        'solutions-digitales'  => 'Solutions Digitales',
        'coaching'             => 'Coaching / Formation',
    ];
    $project_label = $project_labels[ $projectType ] ?? $projectType;
    $today         = wp_date( 'd/m/Y H:i' );

    // ── 1. Sauvegarde locale dans WordPress ───────────────────────────────────
    $contacts   = get_option( 'laforet_contacts', [] );
    $contacts[] = compact( 'name', 'email', 'company', 'phone', 'projectType', 'budget', 'deadline', 'message' ) + [ 'date' => $today ];
    update_option( 'laforet_contacts', $contacts );

    // ── 2. Email de notification ──────────────────────────────────────────────
    $to      = get_option( 'laforet_notif_email', get_option( 'admin_email' ) );
    $subject = "🎯 Nouveau contact : {$name} — {$project_label}";
    $headers = [ 'Content-Type: text/html; charset=UTF-8' ];
    $body    = "
<html><body style='font-family:Arial,sans-serif;'>
<h2 style='color:#0A0A0A;'>Nouveau contact — Laforet Designer</h2>
<p style='color:#888;'>{$today}</p>
<table style='border-collapse:collapse;width:100%;max-width:600px;'>
  <tr><td style='padding:8px 12px;border:1px solid #eee;font-weight:bold;width:140px;'>Nom</td><td style='padding:8px 12px;border:1px solid #eee;'>{$name}</td></tr>
  <tr><td style='padding:8px 12px;border:1px solid #eee;font-weight:bold;'>Email</td><td style='padding:8px 12px;border:1px solid #eee;'><a href='mailto:{$email}'>{$email}</a></td></tr>
  <tr><td style='padding:8px 12px;border:1px solid #eee;font-weight:bold;'>Entreprise</td><td style='padding:8px 12px;border:1px solid #eee;'>" . ( $company ?: '—' ) . "</td></tr>
  <tr><td style='padding:8px 12px;border:1px solid #eee;font-weight:bold;'>Téléphone</td><td style='padding:8px 12px;border:1px solid #eee;'>" . ( $phone ?: '—' ) . "</td></tr>
  <tr><td style='padding:8px 12px;border:1px solid #eee;font-weight:bold;'>Projet</td><td style='padding:8px 12px;border:1px solid #eee;'><strong>{$project_label}</strong></td></tr>
  <tr><td style='padding:8px 12px;border:1px solid #eee;font-weight:bold;'>Budget</td><td style='padding:8px 12px;border:1px solid #eee;'>" . ( $budget ?: '—' ) . "</td></tr>
  <tr><td style='padding:8px 12px;border:1px solid #eee;font-weight:bold;'>Délai</td><td style='padding:8px 12px;border:1px solid #eee;'>" . ( $deadline ?: '—' ) . "</td></tr>
  <tr><td style='padding:8px 12px;border:1px solid #eee;font-weight:bold;vertical-align:top;'>Message</td><td style='padding:8px 12px;border:1px solid #eee;line-height:1.6;'>" . nl2br( esc_html( $message ) ) . "</td></tr>
</table>
<p style='margin-top:24px;'><a href='mailto:{$email}?subject=Re: Votre demande' style='background:#0A0A0A;color:#fff;padding:12px 24px;text-decoration:none;font-weight:bold;'>Répondre à {$name} →</a></p>
</body></html>";

    wp_mail( $to, $subject, $body, $headers );

    // ── 3. Notion (optionnel) ─────────────────────────────────────────────────
    $notion_key = get_option( 'laforet_notion_key', '' );
    $notion_db  = get_option( 'laforet_notion_db',  '' );

    if ( $notion_key && $notion_db ) {
        wp_remote_post( 'https://api.notion.com/v1/pages', [
            'timeout' => 10,
            'headers' => [
                'Authorization'   => 'Bearer ' . $notion_key,
                'Content-Type'    => 'application/json',
                'Notion-Version'  => '2022-06-28',
            ],
            'body' => wp_json_encode( [
                'parent'     => [ 'database_id' => $notion_db ],
                'properties' => [
                    'Nom'            => [ 'title'     => [ [ 'text' => [ 'content' => $name ] ] ] ],
                    'Email'          => [ 'email'     => $email ],
                    'Entreprise'     => [ 'rich_text' => [ [ 'text' => [ 'content' => $company ] ] ] ],
                    'Téléphone'      => [ 'rich_text' => [ [ 'text' => [ 'content' => $phone ] ] ] ],
                    'Type de projet' => [ 'select'    => [ 'name' => $project_label ] ],
                    'Budget'         => [ 'rich_text' => [ [ 'text' => [ 'content' => $budget ] ] ] ],
                    'Délai'          => [ 'rich_text' => [ [ 'text' => [ 'content' => $deadline ] ] ] ],
                    'Message'        => [ 'rich_text' => [ [ 'text' => [ 'content' => $message ] ] ] ],
                    'Date'           => [ 'date'      => [ 'start' => wp_date( 'Y-m-d' ) ] ],
                    'Statut'         => [ 'select'    => [ 'name' => 'Nouveau' ] ],
                ],
            ] ),
        ] );
    }

    return new WP_REST_Response( [ 'success' => true ], 200 );
}
